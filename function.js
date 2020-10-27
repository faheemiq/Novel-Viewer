jQuery(document).ready(() => {
  var next_link, prev_link;
  jQuery("#content-container").before(
    "<div class='inputbox'><input placeholder='chaplink' /><a href='#'>Get Chapter</a></div>"
  );

  jQuery(".inputbox a").on("click", () => {
    if (jQuery(".inputbox input")[0].value.length != 0) {
      var tempData = document.createElement("div");
      var link = jQuery(".inputbox input")[0].value;
      fetch(`https://cors-anywhere.herokuapp.com/${link}`).then((response) => {
        response.text().then((html) => {
          tempData.innerHTML = html;
          console.log(tempData);
          try {
            jQuery("#chapter-content").html(tempData.querySelector("#chapter-entity").innerHTML.split("<br><br>").join("</p><p>"));
          } catch (e) {
            console.log(e);
          }

          var novelLink = getNovel(link);
          prev_link =
            novelLink + tempData.querySelector(".reader-page a.prev").getAttribute("href");
          next_link =
            novelLink + tempData.querySelector(".reader-page a.next").getAttribute("href");

          jQuery("li.prev a.btn").on("click", () => {
            localStorage["chapterLink"] = prev_link;
          });
          jQuery("li.next a.btn").on("click", () => {
            localStorage["chapterLink"] = next_link;
          });
        });
      });
      localStorage["chapterLink"] = jQuery(".inputbox input")[0].value;
    } else {
      localStorage["chapterLink"] = "";
    }
  });

  getNovel = (url) => {
    const novelLink = `https://m.wuxiaworld.co`;
    return novelLink;
  };

  if (localStorage["chapterLink"].length != 0) {
    jQuery(".inputbox input")[0].value = localStorage["chapterLink"];

    jQuery(".inputbox a").click();
  }
});
