const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");

profileButton.addEventListener("click", function () {
  profileMenu.hidden = !profileMenu.hidden;

  profileButton.setAttribute(
    "aria-expanded",
    String(!profileMenu.hidden)
  );
});