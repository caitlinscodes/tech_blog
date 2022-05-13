const editing = false

const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector('#comment_text').value.trim();
  const post_id = window.location.pathname.split('/').at(-1)

  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      window.location.reload()
    } else {
      alert('Failed to create comment');
    }
  }
};

const saveComment = async (event) => {
  let parent = event.target.parentElement
  const id = parent.getAttribute('comment-id')
  let text = parent.querySelector('input').value;
  if (text) {
    const respone = await fetch('/api/comments/${id}', {
      method: 'PUT',
      body: JSON.stringify({text}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) window.location.reload()
  }
}

// Edit Comment???

const delButtonHandler = async (event) => {
  let parent = event.target.parentElement
  const id = parent.getAttribute('comment-id')
  
  if (id) {
    const respone = await fetch('/api/comments/${id}', {
      method: 'DELETE',
      body: JSON.stringify({text}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) window.location.reload()
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentandler);

// Edit Comment Handler???

document
  .querySelector('#delete-comment')?.forEach(element => element.addEventListener('click', delButtonHandler));