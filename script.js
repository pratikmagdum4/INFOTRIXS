const apiUrl = 'https://wisdomwaves.onrender.com'; 
  
    function getRandomQuote() {
      fetch(`${apiUrl}/quote-of-the-day`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('randomQuote').innerHTML = `<strong>${data.author}</strong>: ${data.text}`;
        })
        .catch(error => console.error(error));
    }
    
  
    function getAllQuotes() {
      fetch(`${apiUrl}/quotes`)
        .then(response => response.json())
        .then(data => {
          const quoteList = document.getElementById('quoteList');
          quoteList.innerHTML = "";
          data.forEach(quote => {
            const listItem = document.createElement('li');
            listItem.textContent = `${quote.author}: ${quote.text}`;
            listItem.classList.add('list-group-item');
            quoteList.appendChild(listItem);
          });
        })
        .catch(error => console.error(error));
    }
  
    function addQuote() {
      const newAuthor = document.getElementById('newAuthor').value;
      const newText = document.getElementById('newText').value;

      if (!newAuthor || !newText) {
    alert('Please enter both the author and the quote.');
    return;
  }

      fetch(`${apiUrl}/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author: newAuthor, text: newText }),
      })
      .then(response => response.json())
      .then(data => {
        alert(`Quote added: ${data.author}: ${data.text}`);
        getAllQuotes();
      })
      .catch(error => console.error(error));
    }
  
    function updateQuote() {
      const updateAuthor = document.getElementById('updateAuthor').value;
      const updateText = document.getElementById('updateText').value;
  
      fetch(`${apiUrl}/quotes/${updateAuthor}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: updateText }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(`Quote updated: ${data.author}: ${data.text}`);
          getAllQuotes(); 
        }
      })
      .catch(error => console.error(error));
    }
  
    function deleteQuote() {
      const deleteAuthor = document.getElementById('deleteAuthor').value;
  
      fetch(`${apiUrl}/quotes/${deleteAuthor}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(`Quote deleted: ${data.author}: ${data.text}`);
          getAllQuotes(); 
        }
      })
      .catch(error => console.error(error));
    }
  
    function searchQuotes() {
      const searchAuthor = document.getElementById('searchAuthor').value;
  
      fetch(`${apiUrl}/quotes/search?author=${searchAuthor}`)
        .then(response => response.json())
        .then(data => {
          const searchResult = document.getElementById('searchResult');
          searchResult.innerHTML = "";
          data.forEach(quote => {
            const listItem = document.createElement('li');
            listItem.textContent = `${quote.author}: ${quote.text}`;
            listItem.classList.add('list-group-item');
            searchResult.appendChild(listItem);
          });
        })
        .catch(error => console.error(error));
    }
