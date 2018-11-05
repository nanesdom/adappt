ansArr = [];
contentArray =[];

function firstGame()
{
	game = shuffle([1,2,3,4,5]);
	questions = [];
	answers = [];
	numGame = -1;
	contWon = 0;
	getContent3();
}

function getContent3()
{
  fetch('/SocialApp/sources/imagenesTxt.txt')
  .then(res => res.text())
  .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => contentArray.push(line));
    divideLines(contentArray);
  });
}

function divideLines(arr)
{
	for (i = 0; i < arr.length; i++)
	{
		if(i % 2 == 0)
		{
			questions.push(arr[i]);
		}
		else
		{
			answers.push(parseInt(arr[i]));
		}
	}
	setQuestion();
}


function checkAns(res)
{
	if(answers[game[numGame] - 1] == res)
	{
		contWon++;
	}
	if (numGame < 4) 
	{
		setQuestion();
	} 
	else 
	{
		showResult();
	}
}

function setQuestion()
{
	numGame = numGame + 1;
	quest = document.getElementById('quest');
	opt1 = document.getElementById('opt1');
	opt2 = document.getElementById('opt2');

	quest.innerHTML = questions[game[numGame] - 1];
	opt1.innerHTML = '<img src="sources/r1p' + game[numGame] +'.jpg">';
	opt2.innerHTML = '<img src="sources/r2p' + game[numGame] +'.jpg">';
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function showResult()
{
	document.getElementById('gameArea').innerHTML = "<h1>Juegos Ganados: " + contWon + "/5</h1>";
}

function save()
{
	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "php/saveImagenes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	questionsD = document.getElementsByName("pregs");

	l = "";

	for (i = 0; i < questionsD.length; i++) {

		ansArr.push(parseInt(document.querySelector('input[name="p' + (i+1) + '"]:checked').value));

		l = l + questionsD[i].value + "xEOLx" + ansArr[i] + "xEOLx";
	}

	xhttp.send('l=' + l);
}