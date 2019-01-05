var pos = -1, test, test_status, question, choice, choices, chA, chB, chC, chD, chE, chF, correct = 0, score = 0, chances = 0;
var questions = [
    [ "What is 10 + 4?", "12", "14", "16", "B" ],
	[ "What is 20 - 9?", "7", "13", "11", "C" ],
	[ "What is 7 x 3?", "21", "24", "25", "A" ],
	[ "What is 8 / 2?", "10", "2", "4", "C" ]
];

function _(x){
    return document.getElementById(x)
}

//This renders the questions
function renderQuestion(){
    test = _("test");

    //This introduces the start button so the students have time to gather everyone to pay attention to the test in their group
    if(pos == (-1)){
        test.innerHTML = "<button class = 'start' onclick = 'advance()'>START</button>"
    }

    //This announces the question is finished and the score and the number of questions they got right
    if(pos >= questions.length){
        test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct!</h2><br>";
        test.innerHTML += "<h3> Your score is " + score + "</h3>";
         _("test_status").innerHTML = "Test Completed";
         pos = 0;
         score = 0;
         return false;
    }
    
    //This handles the actual question rendering
    if(pos >= 0 && pos < questions.length){
    _("test_status").innerHTML = "Question " + (pos+1) + " of " + questions.length;
    question = questions[pos][0];
    chA = questions[pos][1];
    chB = questions[pos][2];
    chC = questions[pos][3];
    test.innerHTML = "<h3>" + question + "</h3>";
    test.innerHTML += "<input type='button' value='A' onclick = 'checkAnswer(this);'>"+chA+"<br>";
    test.innerHTML += "<input type='button' value='B' onclick = 'checkAnswer(this);'>"+chB+"<br>";
    test.innerHTML += "<input type='button' value='C' onclick = 'checkAnswer(this);'>"+chC+"<br><br>";
    //test.innerHTML += "<button onclick = 'checkAnswer()'>Submit Answer</button>";
    }
}


function advance(){
    pos += 1;
    renderQuestion();
}


function checkAnswer(ele){
    var lastElement = (questions[pos].length - 1)//Choosing the last element modularly without needing to be updated each time the number of questions is changed
    console.log(pos);// Test for position
    var answer = questions[pos][lastElement];//Uses the last element value to choose the actual last element of the question array
    console.log(answer);//Test to see if answer chosen is correct

    /*
    choices = document.getElementsByName("choices");
    console.log(choices);
    for(var i=0; i<choices.length; i++){
        if(choices[i].checked){
            choice = choices[i].value;
            console.log(choice);
        }
    }
*/
choice = ele.value;//assigns the value of the  input to choice
console.log(choice);

/*basic scoring for correct answers, checks if the value of choice is equal to the last element of the question array and the number of chances
the individual took to get the correct answer and scores them accordingly*/
    if(choice == answer){
        pos++;
        correct++;
        console.log(chances);
        if (chances == 0){
            score += 5
        } else if(chances == 1){
            score += 3
        } else if(chances >= 2){
            score += 1
        }
        chances = 0;
    }else {
        chances++;
        console.log(chances);
        alert('You have gotten the question wrong please try again');
    }
    renderQuestion();
    console.log(score);
}

window.addEventListener("load", renderQuestion, false);



