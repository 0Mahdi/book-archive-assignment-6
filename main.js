const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const errorDiv = document.getElementById("error");

searchBtn.addEventListener("click", function () {
    const search = searchInput.value;

    // Clear error message
    errorDiv.innerText = "";

    // Clear existing book results
    bookContainer.innerHTML = "";

    fetch(`https://openlibrary.org/search.json?q=${search}`)
        .then(response => response.json())
        .then(data => showData(data.docs)); // Pass data.docs to the showData function
});

function showData(bookArray) {
    if (bookArray.length === 0) {
        errorDiv.innerText = "No Results Found";
    } else {
        bookArray.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = "col-md-3 col-12 book-card"; // Use the "book-card" class
            bookDiv.innerHTML = `
                <div class="rounded overflow-hidden border p-2">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-100 book-image" alt="">
                </div>
                <div class="py-2 d-flex flex-column justify-content-between d-md-block text-md-center book-details">
                    <h3>Title: ${book.title}</h3>
                    <h5>Author(s): ${book.author_name ? book.author_name.join(', ') : 'N/A'}</h5>
                    <h6>Publish Year: ${book.first_publish_year ? book.first_publish_year : 'N/A'}</h6>
                </div>
            `;
            bookContainer.appendChild(bookDiv);
        });
    }
}
