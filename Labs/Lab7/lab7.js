function loadBooks(bookName){
    var sanitizedBookName = bookName.replace(/ /g, "+");
    return fetch(
        `https://openlibrary.org/search.json?title=${sanitizedBookName}`
        ).then((res) => res.json());
}

async function loadUpSite(){
    document.getElementById('placeholderText').innerHTML = 'Please wait while we load the books'
    bookTable = document.getElementById('bookTable')

    bookname = document.getElementById('bookname').value
    console.log(bookname)

    loadBooks(bookname)
    .then((res) => {
        console.log(res)
        document.getElementById('placeholderText').style.display = 'none'
        bookTable.style.display = 'block';

        res.docs.forEach(book => {
            console.log(book)
            var td = document.createElement('tr');
            var titleName = document.createElement('td');
            var authorName = document.createElement('td');
            
            titleName.innerHTML = book.title;
            authorName.innerHTML = book['author_name'][0]

            td.appendChild(titleName)
            td.appendChild(authorName)

            bookTable.appendChild(td)
        });
    })
}