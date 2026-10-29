const postsContainer = document.getElementById("posts");
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Tallinn",
});

// "async" because fetching a file takes time
async function loadPosts() {
  // Telling the browser that this section is loading.
  postsContainer.setAttribute("aria-busy", "true");

  try {
    // Task 4: fetch from online endpoint
    // const response = await fetch("https://api.npoint.io/23e23d9543205e32f3b6");

    // Task 5: fetch from local JSON file
    const response = await fetch("./data/posts.json");    

    // A response can arrive even if the file was not found.
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: HTTP  ${response.status}`);
    }

    // Read the response and convert it to a JS object.
    const posts = await response.json();

    // If the JSON isn't an array of posts, give an error.
    if (!Array.isArray(posts)) {
      throw new Error("The JSON must contain an array of posts!");
    }

    // Create a temp container for HTML elements.
    const fragment = document.createDocumentFragment();

    for (const post of posts) {
      // Turning the posts data into HTML elemetnts.
      fragment.appendChild(createPost(post));
    }

    // Remove the loading message and add posts.
    postsContainer.replaceChildren(fragment);

    // Show an error if the JSON array was empty.
    if (posts.length === 0) {
      postsContainer.textContent = "No posts found.";
    }
  } catch (error) {
    // Technical details in the dev console.
    console.error("Error loading posts:", error);

    // Simple error messaage for the user using the page.
    const message = document.createElement("p");
    message.setAttribute("role", "alert");
    message.textContent = "Could not load posts. Please try again later.";

    // Replace the error message.
    postsContainer.replaceChildren(message);
  } finally {
    // This runs whether the fetch was successful or not.
    postsContainer.setAttribute("aria-busy", "false");
  }
}

// Take one post object and build it into a HTML article.
// Only returns the article, does not add it to the page.
function createPost(post) {
  // Create the outer <article class ="post"> element.
  const article = document.createElement("article");
  article.className = "post";

  // Create a container for the autors's photo, name, and date.
  const header = document.createElement("div");
  header.className = "post-header";

  // Create the author's profile picture.
  const avatar = document.createElement("img");
  avatar.className = "post-profile";
  avatar.src = post.avatar;
  avatar.alt = `${post.author}'s profile picture`;

  // Create a bold element for the author's name.
  // textContent inserts plain text instead of HTML.
  const author = document.createElement("strong");
  author.textContent = post.author;

  const date = document.createElement("time");
  date.className = "post-date";
  date.dateTime = post.createdAt; // Keep the original date string in the datetime HTML attribute.
  date.textContent = dateFormatter.format(new Date(post.createdAt)); // Convert the JSON date into a JS date and format it for readability.

  // Put the completed header inside the article.
  header.append(avatar, author, date);
  article.appendChild(header);

  // Some posts only have an image path, others have null.
  // Only create an image element if the path exists.
  if (post.image) {
    const image = document.createElement("img");
    image.className = "post-image";
    image.src = post.image;

    image.alt = post.imageAlt; // Alt text if the image cannot load.

    // Let the browser delay loading iamges until they are near the viewport.
    image.loading = "lazy";

    article.appendChild(image);
  }

  // Paragraph for the post's text.
  const text = document.createElement("p");
  text.textContent = post.text;

  const likeButton = document.createElement("button");
  likeButton.className = "like-button";

  // Prevent the button from submitting a form if it is inside one.
  likeButton.type = "button";
  likeButton.textContent = "👍";

  // Give the emoji a descriptive name.
  likeButton.setAttribute("aria-label", `Like ${post.author}'s post`);

  article.append(text, likeButton);

  return article;
}

// Start fetching the posts.
loadPosts();
