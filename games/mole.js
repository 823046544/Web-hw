var ing = 0, score = 0, timeLeft = 30, whichRadio = 0;
var timerScreen, con, scoreScreen;
var time, radios = [];
function stop() {
    clearInterval(time);
    ing = 0;
    con.innerHTML = "Game Over";
    radios[whichRadio].checked = false;
    for (i = 0; i < 6; i++)
        for (j = 0; j < 10; j++) {
        radios[i * 10 + j].disabled = true;
    }
    alert("Game Over." + "\n" + "Your score is " + score);
    score = 0; timeLeft = 30;
    timerScreen.innerHTML = timeLeft;
}
function pass() {
    timeLeft--;
    if (timeLeft < 0) { 
        clearInterval(time);
        stop();
    }
    timerScreen.innerHTML = timeLeft;
}
window.onload = function()  {
    var elmnt, st, i, j, newRadio;
    timerScreen = document.getElementById("time");
    radios = document.getElementsByName("which");
    con = document.getElementById("condition");
    scoreScreen = document.getElementById("score");
    for (i = 1; i <= 6; i++) {
        st = "a"+i;
        elmnt = document.getElementById(st);
        for (j = 1; j <= 10; j++) {
            newRadio = document.createElement("input");
            newRadio.setAttribute("type","radio");
            newRadio.setAttribute("name","which");
            newRadio.setAttribute("value",st+j);
            newRadio.setAttribute("class","unvisit");
            newRadio.disabled = true;
            elmnt.appendChild(newRadio);
        }
    }
    document.getElementById("start").onclick = function() {
        ing = 1-ing;
        if (ing == 0) {
            stop();
        } else {
            con.innerHTML = "Playing";
            for (i = 0; i < 6; i++)
                for (j = 0; j < 10; j++) {
                radios[i * 10 + j].disabled = false;
            }
            timerScreen.innerHTML = timeLeft;
            scoreScreen.innerHTML = score;
            time = setInterval(pass,1000);
            whichRadio = Math.round(Math.random() * 59);
            radios[whichRadio].checked = true;
            radios[whichRadio].setAttribute("class","visited");
        }
    }
    for (i = 0; i < 60; i++)
        radios[i].onclick = function() {
            if (radios[whichRadio].checked) {
                score++;
                radios[whichRadio].checked = false;
                radios[whichRadio].setAttribute("class","unvisit");
                scoreScreen.innerHTML = score;
                whichRadio = Math.round(Math.random() * 59);
                radios[whichRadio].checked = true;
                radios[whichRadio].setAttribute("class","visited");
            } else {
                score--;
                radios[whichRadio].checked = true;
                scoreScreen.innerHTML = score;
            }
        }
}