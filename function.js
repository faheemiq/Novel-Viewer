$(document).ready(function () {
  if (localStorage["chapterLink"].length != 0) {
    btnChapterPressed(localStorage["chapterLink"]);
  }
  if (localStorage["commentLink"].length != 0) {
    bthCommentPressed(localStorage["commentLink"]);
  }
  $(".linkchapter").val(localStorage["chapterLink"]);
  $(".linkcomment").val(localStorage["commentLink"]);

  $(".linkchapterbtn").click(() => {
    var link = $(".linkchapter").val();
    btnChapterPressed(link);
  });
  $(".linkcommentbtn").click(() => {
    var link = $(".linkcomment").val();
    bthCommentPressed(link);
  });
  $(".prevFloat").click(() => {
    $(".prevbtn > a").trigger("click");
    $(".prevcommentbtn > a").trigger("click");
  });
  $(".nextFloat").click(() => {
    $(".nextbtn > a").trigger("click");
    $(".nextcommentbtn > a").trigger("click");
  });
});

newComment = (imageLink, commentText, poster) => {
  if (imageLink === "/images/profile.png") {
    var imageLink = "images/profile.png";
  }
  var newCommentDiv = document.createElement("div");
  var commentData = document.createElement("div");
  var commentImage = document.createElement("img");
  var commentPara = document.createElement("p");
  var commentChilds = document.createElement("div");
  var commentPoster = document.createElement("h4");
  newCommentDiv.className = "newComment";
  commentData.className = "commentData";
  commentImage.className = "commentImage";
  commentPara.className = "commentPara";
  commentChilds.className = "commentChilds";
  commentPoster.className = "commentPoster";
  commentImage.setAttribute("src", imageLink);
  commentPara.innerHTML = commentText;
  commentPoster.innerHTML = poster;
  commentData.append(commentImage);
  commentData.append(commentPoster);
  commentData.append(commentPara);
  newCommentDiv.append(commentData);
  newCommentDiv.append(commentChilds);
  return newCommentDiv;
};

bthCommentPressed = (link) => {
  $(".commentarea").html("");
  var tempData = document.createElement("div");
  fetch(link).then((response) => {
    response.text().then((html) => {
      tempData.innerHTML = html;
      console.log(tempData);
      $(".commentChapNumber").html(
        tempData.querySelector(".section .panel.panel-default .caption h4")
      );
      $(".prevcommentbtn").html(
        tempData.querySelector(".nav-bar-area .prev").innerHTML
      );
      $(".nextcommentbtn").html(
        tempData.querySelector(".nav-bar-area .next").innerHTML
      );
      $(".prevcommentbtn a").html("Previous");
      $(".nextcommentbtn a").html("Next");
      setCommentBtnLink(".prevcommentbtn");
      setCommentBtnLink(".nextcommentbtn");
      var execCommentID = tempData.querySelector(
        "div > script:nth-last-child(2)"
      ).innerHTML;
      setTimeout(execCommentID, 0);
      setTimeout(() => {
        var newLink = `https://www.wuxiaworld.com/api/comments/${COMMENTS_SETTINGS.id}/top`;
        fetch(newLink).then((response) => {
          response.json().then((commentData) => {
            checkChildren(commentData.items, $(".commentarea"));
          });
        });
      }, 1);
    });
  });
  localStorage["commentLink"] = link;
  $(".linkcomment").val(localStorage["commentLink"]);
};

checkChildren = (data, storage) => {
  data.forEach((element) => {
    var newCommt = newComment(element.avatar, element.content, element.poster);
    if (element.children.length > 0) {
      checkChildren(element.children, newCommt.querySelector(".commentChilds"));
    }
    storage.append(newCommt);
  });
};

btnChapterPressed = (link) => {
  var tempData = document.createElement("div");
  fetch(link).then((response) => {
    response.text().then((html) => {
      tempData.innerHTML = html;
      $(".chaptercontent").html(tempData.querySelector("#chaptercontent"));
      var novelLink = getNovel(link);
      $(".prevbtn").html(tempData.querySelector("#pt_prev"));
      setChapterBtnLink(".prevbtn", novelLink);
      $(".nextbtn").html(tempData.querySelector("#pt_next"));
      setChapterBtnLink(".nextbtn", novelLink);
    });
  });
  localStorage["chapterLink"] = link;
  $(".linkchapter").val(localStorage["chapterLink"]);
};

getNovel = (url) => {
  const novelLink =
    "https://" +
    url.replace(/^https?:\/\//, "").split("/")[0] +
    "/" +
    url.replace(/^https?:\/\//, "").split("/")[1] +
    "/";
  return novelLink;
};

setChapterBtnLink = (id, novelLink) => {
  var isLoadedChapter = setInterval(() => {
    if ($(".prevbtn *").length != 0) {
      var btnlink = $(`${id} > a`).attr("href");
      $(`${id} > a`).attr("href", "#chapcontent");
      var newBtnLink = novelLink + btnlink;
      $(`${id} > a`).click(() => btnChapterPressed(newBtnLink));
      clearInterval(isLoadedChapter);
    }
  }, 100);
};

setCommentBtnLink = (id) => {
  var isLoadedComment = setInterval(() => {
    if ($(".prevcommentbtn *").length != 0) {
      var btnlink = $(`${id} > a`).attr("href");
      $(`${id} > a`).attr("href", "#comments");
      var newBtnLink = "https://www.wuxiaworld.com" + btnlink;
      $(`${id} > a`).click(() => bthCommentPressed(newBtnLink));
      clearInterval(isLoadedComment);
    }
  }, 100);
};

const res = new Response("Hello world");
