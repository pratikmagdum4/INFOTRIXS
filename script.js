const apiUrl = 'https://wisdomwaves.onrender.com';

function fetchAndUpdateQuoteList(url, updateFunction) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      updateFunction(data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}

function getRandomQuote() {
  fetchAndUpdateQuoteList(`${apiUrl}/quote-of-the-day`, data => {
    document.getElementById('randomQuote').innerHTML = `<strong>${data.author}</strong>: ${data.text}`;
  });
}

function updateQuoteList(data, listElementId) {
  const quoteList = document.getElementById(listElementId);
  quoteList.innerHTML = "";
  data.forEach(quote => {
    const listItem = document.createElement('li');
    listItem.textContent = `${quote.author}: ${quote.text}`;
    listItem.classList.add('list-group-item');
    quoteList.appendChild(listItem);
  });
}

function getAllQuotes() {
  fetchAndUpdateQuoteList(`${apiUrl}/quotes`, data => {
    updateQuoteList(data, 'quoteList');
  });
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
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to add quote. Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    alert(`Quote added: ${data.author}: ${data.text}`);
    getAllQuotes();
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
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
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to update quote. Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      alert(`Quote updated: ${data.author}: ${data.text}`);
      getAllQuotes();
    }
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
}

function deleteQuote() {
  const deleteAuthor = document.getElementById('deleteAuthor').value;

  fetch(`${apiUrl}/quotes/${deleteAuthor}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to delete quote. Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      alert(`Quote deleted: ${data.author}: ${data.text}`);
      getAllQuotes();
    }
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
}

function searchQuotes() {
  const searchAuthor = document.getElementById('searchAuthor').value;

  fetchAndUpdateQuoteList(`${apiUrl}/quotes/search?author=${searchAuthor}`, data => {
    updateQuoteList(data, 'searchResult');
  });
}
