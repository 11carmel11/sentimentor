const URL = "https://sentim-api.herokuapp.com/api/v1/";
const JOKEURL =
  "https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=twopart";
let text;

async function buttonHandler() {
  try {
    const jsonJoke = await fetch(JOKEURL);
    const joke = await jsonJoke.json();
    document.getElementById("type").innerText = joke.delivery;
    document.getElementById("polarity").innerText = joke.setup;    
    if (document.getElementById("image")) {
      document.getElementById("image").remove();
    }
    document.getElementById("output").classList = "";
    text = document.getElementById("dream").value;
    const almostAns = await fetch(URL, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        text,
      }),
    });
    const ans = await almostAns.json();
    const result = ans.result;
    if (!almostAns.ok) {
      document.getElementById("type").innerText = "Something went wrong... ";
      return;
    }
    const image = document.createElement("img");
    setAttributes(image, {
      id: "image",
      src: `https://http.cat/${almostAns.status}`,
      alt: "statuscat",
      height: "300px",
      width: "300px",
    });
    function timer () {
        delay(result.type, result.polarity, image)
    }
    setTimeout(timer, 5000);
  } catch (error) {
    document.getElementById("type").innerText =
      "Something went wrong . . . " + error;
  }
}

function setAttributes(elm, attr) {
  for (let key in attr) {
    elm.setAttribute(key, attr[key]);
  }
}

function delay (type, pol, img) {
    document.body.append(img);
    document.getElementById("type").innerText = type;
    document.getElementById("polarity").innerText = pol;
    document.getElementById("output").classList.add(type);
    document.getElementById("output").classList.add("answer");
}