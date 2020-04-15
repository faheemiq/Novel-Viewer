$(document).ready(function () {
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

newComment = (imageLink, commentText) => {
  if (imageLink === "/images/profile.png") {
    var imageLink = "images/profile.png";
  }
  var newCommentDiv = document.createElement("div");
  var commentImage = document.createElement("img");
  var commentData = document.createElement("p");
  var commentChilds = document.createElement("div");
  newCommentDiv.className = "newComment";
  commentImage.className = "commentImage";
  commentData.className = "commentData";
  commentChilds.className = "commentChilds";
  commentImage.setAttribute("src", imageLink);
  commentData.innerHTML = commentText;
  newCommentDiv.append(commentImage);
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
            commentData.items.forEach((element) => {
              $(".commentarea").append(
                newComment(element.avatar, element.content)
              );
            });
          });
        });
      }, 1);
    });
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
      console.log(newBtnLink);
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
