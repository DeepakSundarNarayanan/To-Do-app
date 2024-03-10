document.addEventListener("DOMContentLoaded", function () {
    const blogsContainer = document.getElementById("blogs");
    const createBlogButton = document.getElementById("create-blog");
    const newBlogContainer = document.getElementById("new-blog");
    const addBlogButton = document.getElementById("add-blog");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const authorInput = document.getElementById("author");
    const editBlogContainer = document.getElementById("edit-blog");
    const updateBlogButton = document.getElementById("update-blog");
    const editTitleInput = document.getElementById("edit-title");
    const editContentInput = document.getElementById("edit-content");
    const editAuthorInput = document.getElementById("edit-author");

    let blogs = []; // Array to store blog data
     
    let editingIndex = -1;
    // Fetch blog data from JSON file using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/data/blog.json", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            blogs = JSON.parse(xhr.responseText);
            renderBlogs();
        } else {
            console.error("Failed to load blog data.");
        }
    };
    xhr.send();
// calls the createbolg eleements and adds it to the id in HTML
    function renderBlogs() {
        blogsContainer.innerHTML = '';
        blogs.forEach((blog, index) => {
            const blogElement = createBlogElement(blog, index);
            blogsContainer.appendChild(blogElement);
        });
    }
//    This creates and adds the html elements to classes
    function createBlogElement(blog, index) {
        const blogElement = document.createElement("div");
        blogElement.className = "blog";
        blogElement.innerHTML = `
            <h2>${blog.title}</h2>
            <p>Author: ${blog.author}</p>
            <p>Created: ${blog.creationdate}</p>
            <p class="content">${blog.content}</p>
        `;
        blogElement.addEventListener("click", () => expandBlog(index));
        const editIcon = document.createElement("span");
        editIcon.innerHTML = "✏️";
        editIcon.className = "edit-icon";
        editIcon.addEventListener("click", () => editBlog(index));
        blogElement.appendChild(editIcon);
        return blogElement;
    }
// function for expanding 
    function expandBlog(index) {
        const blogElement = blogsContainer.children[index];
        blogElement.classList.toggle("expanded");
    }

    function createBlog() {
        newBlogContainer.style.display = "block";
        createBlogButton.style.display = "none";
    }

    function addBlog() {
        const title = titleInput.value;
        const content = contentInput.value;
        const author = authorInput.value;
        const created = new Date().toLocaleString();

        if (title && content && author) {
            blogs.push({ title, content, author, creationdate: created });
            renderBlogs();

            titleInput.value = "";
            contentInput.value = "";
            authorInput.value = "";

            newBlogContainer.style.display = "none";
            createBlogButton.style.display = "block";
        }
    }

    function editBlog(index) {
        editTitleInput.value = blogs[index].title;
        editContentInput.value = blogs[index].content;
        editAuthorInput.value = blogs[index].author;
        editBlogContainer.style.display = "block";
        editingIndex = index;
    }
    //   saves the changes when the button is clicked this function is called from eventListener
    function updateBlog() {
        if (editingIndex !== -1) {
            const title = editTitleInput.value;
            const content = editContentInput.value;
            const author = editAuthorInput.value;

            if (title && content && author) {
                blogs[editingIndex] = {
                    title,
                    content,
                    author,
                    creationdate: blogs[editingIndex].creationdate,
                };
                renderBlogs();

                // Reset the edit form
                editTitleInput.value = "";
                editContentInput.value = "";
                editAuthorInput.value = "";
                editBlogContainer.style.display = "none";
                editingIndex = -1;
            }
        }
    }
        //   event listeners for the three buttons
    updateBlogButton.addEventListener("click", updateBlog);
    createBlogButton.addEventListener("click", createBlog);
    addBlogButton.addEventListener("click", addBlog);
    
});


