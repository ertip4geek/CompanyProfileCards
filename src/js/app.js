import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); //print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${variables.name} ${variables.lastname}</h1>
          <h2>${variables.role}</h2>
          <h3>${variables.city}<br>${variables.country}</h3>
          <ul class="${variables.socialMediaPosition}">
            <li><a href="${variables.twitter}"><i class="fab fa-twitter"></i></a></li>
            <li><a href="${variables.twitter}"><i class="fab fa-github"></i></a></li>
            <li><a href="${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="${variables.instagram}"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background: "https://picsum.photos/200/300",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/lego/1.jpg",
    // social media bar position (left or right)
    socialMediaPosition: null,
    // social media usernames
    twitter: null,
    github: "ertip4geek",
    linkedin: null,
    instagram: null,
    name: "",
    lastname: "",
    role: "Position",
    country: "Pais",
    city: "Ciudad"
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      setAvatar(window.variables);
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};

function setAvatar() {
  if (window.variables.name != "" && window.variables.lastname != "") {
    window.variables.avatarURL = getAvatar();
  }
}
function getAvatar() {
  return (
    "https://randomuser.me/api/portraits/lego/" +
    Math.floor(Math.random() * 10) +
    ".jpg"
  );
}
