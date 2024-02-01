var myPlayer = videojs("my-video"),
  playerdoc = document.getElementById("player"),
  questions = [
    {
      ques: "What is the second letter of alphabet?",
      options: ["a", "b", "c"],
      correctAns: "b",
      time: 1,
      isShowed: !1,
    },
    {
      ques: "what is the third number?",
      options: ["1", "2", "3"],
      correctAns: "3",
      time: 5,
      isShowed: !1,
    },
  ];
function handleTimeChange() {
  var e = myPlayer.currentTime(),
    n = questions.find(function (n) {
      return !n.isShowed && e >= n.time;
    });
  if (n) {
    (n.isShowed = !0), myPlayer.pause();
    var t = document.createElement("div");
    if (
      ((t.id = "ques.".concat(n.ques, ".div")),
      t.classList.add(
        "absolute",
        "w-full",
        "h-full",
        "bg-black/[0.5]",
        "inset-0"
      ),
      (t.innerHTML =
        '\n <div class="flex items-center h-full justify-center opacity-100">\n <form class="w-[450px] bg-white p-4 rounded-md" id="ques-'
          .concat(n.ques, '"> \n <h1 class="border-b mb-5 text-lg">')
          .concat(n.ques, "</h1>\n ")
          .concat(
            n.options
              .map(function (e, t) {
                return '\n <input type="radio" id="opt-'
                  .concat(t, '" name="question-')
                  .concat(n.ques, '" value="')
                  .concat(e, '">\n <label for="opt-')
                  .concat(t, '">')
                  .concat(e, "</label>\n ");
              })
              .join("<br>"),
            '\n <br>\n <br>\n <button type="submit" class="flex justify-end p-2 bg-green-500 rounded-lg text-white" >Submit</button>\n </form>\n </div>\n'
          )),
      playerdoc)
    ) {
      playerdoc.appendChild(t);
      var i = document.getElementById("ques-".concat(n.ques));
      i &&
        i.addEventListener("submit", function (e) {
          if (
            (e.preventDefault(),
            new FormData(e.currentTarget).get("question-".concat(n.ques)) ==
              n.correctAns)
          ) {
            t.innerHTML =
              '\n <div class="flex items-center h-full justify-center ">\n <div class="w-[250px] bg-white p-4 rounded-md">\n <h1>Correct</h1>\n <br>\n <button id="cont" class="p-2 bg-green-500 text-white rounded-md">Continue</button>\n </div>\n </div>\n ';
            var i = document.getElementById("cont");
            i &&
              i.addEventListener("click", function () {
                t.remove(), myPlayer.play();
              });
          } else {
            t.innerHTML =
              '\n <div class="flex items-center h-full justify-center">\n <div class="w-[250px] bg-white p-4 rounded-md">\n <h1>InCorrect</h1>\n <br>\n <button id="rety" class="p-2 bg-red-500 text-white rounded-md">Retry</button>\n </div>\n </div>\n ';
            var o = document.getElementById("rety");
            o &&
              o.addEventListener("click", function () {
                (n.isShowed = !1), handleTimeChange(), t.remove();
              });
          }
        });
    }
  }
}
myPlayer.on("timeupdate", handleTimeChange);
