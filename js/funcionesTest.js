caseX = 1;
questionsArr = [];
res1Arr = [];
res2Arr = [];
res3Arr = [];
ansArr = [];
contentArray =[];

function addQuestion()
{
	caseX = caseX + 1;
	cases = document.getElementById("questions");

	superDiv = document.createElement('div');
	superDiv.id = 'case' + caseX;

	newDiv = document.createElement('div');
	newDiv.setAttribute('class', 'question');
	

	newQuest = document.createElement('input');
	newQuest.setAttribute('type', 'text');
	newQuest.setAttribute('class', 'questionField');

	newAns1 = document.createElement('input');
	newAns1.setAttribute('type', 'text');
	newAns1.setAttribute('name', 'ans1');
	newAns1.setAttribute('class', 'answerField');

	newRadio1 = document.createElement('input');
	newRadio1.setAttribute('type', 'radio');
	newRadio1.setAttribute('name', 'r' + caseX);
	newRadio1.setAttribute('class', 'radioAns');
	newRadio1.setAttribute('value', '0');
	newRadio1.setAttribute('checked', 'true');

	newAns2 = document.createElement('input');
	newAns2.setAttribute('type', 'text');
	newAns2.setAttribute('name', 'ans2');
	newAns2.setAttribute('class', 'answerField');

	newRadio2 = document.createElement('input');
	newRadio2.setAttribute('type', 'radio');
	newRadio2.setAttribute('name', 'r' + caseX);
	newRadio2.setAttribute('class', 'radioAns');
	newRadio2.setAttribute('value', '1');

	newAns3 = document.createElement('input');
	newAns3.setAttribute('type', 'text');
	newAns3.setAttribute('name', 'ans3');
	newAns3.setAttribute('class', 'answerField');

	newRadio3 = document.createElement('input');
	newRadio3.setAttribute('type', 'radio');
	newRadio3.setAttribute('name', 'r' + caseX);
	newRadio3.setAttribute('class', 'radioAns');
	newRadio3.setAttribute('value', '2');

	newDiv2 = document.createElement('div');
	newDiv2.setAttribute('class', 'btnsControl');

	newBtnPlus = document.createElement('button');
	newBtnPlus.innerHTML = "+";
	newBtnPlus.setAttribute('onclick', 'addQuestion()');

	newBtnLess = document.createElement('button');
	newBtnLess.innerHTML = "-";
	newBtnLess.setAttribute('onclick', 'removeQuestion(this.parentNode.parentNode.id)');

	h3 = document.createElement('h3');
	h3.innerHTML = 'Pregunta';

	h32 = document.createElement('h3');
	h32.innerHTML = 'Respuestas';

	newDiv.appendChild(h3);
	newDiv.appendChild(newQuest);
	newDiv.appendChild(h32);
	newDiv.appendChild(newAns1);
	newDiv.appendChild(newRadio1);
	newDiv.appendChild(newAns2);
	newDiv.appendChild(newRadio2);
	newDiv.appendChild(newAns3);
	newDiv.appendChild(newRadio3);
	newDiv2.appendChild(newBtnPlus);
	newDiv2.appendChild(newBtnLess);
	superDiv.appendChild(newDiv);
	superDiv.appendChild(newDiv2);
	cases.appendChild(superDiv);
}

function removeQuestion(id)
{
	caseT = document.getElementById(id);
	caseT.parentElement.removeChild(caseT);
}

function save()
{
	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "php/saveTest.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	questions = document.getElementsByClassName("questionField");
	ans1 = document.getElementsByName("ans1");
	ans2 = document.getElementsByName("ans2");
	ans3 = document.getElementsByName("ans3");

	l = "";

	for (i = 0; i < questions.length; i++) {
		questionsArr.push(questions[i].value);
		res1Arr.push(ans1[i].value);
		res2Arr.push(ans2[i].value);
		res3Arr.push(ans3[i].value);

		ansArr.push(parseInt(document.querySelector('input[name="r' + (i+1) + '"]:checked').value));

		l = l + questionsArr[i] + "xEOLx" + res1Arr[i] + "xEOLx" + res2Arr[i] + "xEOLx" + res3Arr[i] + "xEOLx" + ansArr[i] + "xEOLx";
	}

	xhttp.send('l=' + l);
}

function getContent5()
{
  fetch('/SocialApp/sources/test.txt')
  .then(res => res.text())
  .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => contentArray.push(line));
    divideLines(contentArray);
  });
}

function divideLines(arr)
{

	caseX = 1;
questionsArr = [];
res1Arr = [];
res2Arr = [];
res3Arr = [];
ansArr = [];
contentArray =[];

	for (i = 0; i < arr.length; i++)
	{
		v = i % 5;
		if(arr[i] != "")
		{
			switch (v)
			{
				case 0:
					questionsArr.push(arr[i]);
				break;
				case 1:
					res1Arr.push(arr[i]);
				break;
				case 2:
					res2Arr.push(arr[i]);
				break;
				case 3:
					res3Arr.push(arr[i]);
				break;
				case 4:
					ansArr.push(arr[i]);
				break;
				default:
				break;
			}
		}
	}
	setTest();
}

function setTest()
{
	quest = document.getElementById("testArea");
	for (i = 0; i < ansArr.length; i++)
	{
		quest.innerHTML += '<div class="questionT">' +
				'<h2>' + questionsArr[i] + '</h2>' +
				'<input type="radio" name="q' + (i + 1) + '" value="0" checked>' + res1Arr[i] + "<br>" +
				'<input type="radio" name="q' + (i + 1) + '" value="1">' + res2Arr[i] + "<br>" +
				'<input type="radio" name="q' + (i + 1) + '" value="2">' + res3Arr[i] + "<br><br><br>" +
			'</div>';
	}
}

function sendTest()
{
	var rest = 0;
	for (var i = 0; i < ansArr.length; i++) {
		if(parseInt(document.querySelector('input[name="q' + (i+1) + '"]:checked').value) == ansArr[i])
		{
			rest = rest + 1;
		}	
	}
	console.log(rest);
 
	quest = document.getElementById("testArea");
	quest.innerHTML	= "<h3 id='restCuest'>Has acertado en " + rest + "/" + ansArr.length + " preguntas</h3>";
}