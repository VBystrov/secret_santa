import Pairs from './Pairs.js';
import User from './User.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchUserButton = document.getElementById('search-user');
  const searchUserId = document.getElementById('userid');
  const userName = document.getElementById('name');
  const userSurname = document.getElementById('surname');
  const wishlist = document.getElementById('wishlist');
  const addWishButton = document.getElementById('add-wish');
  const registerButton = document.getElementById('register');
  const message = document.getElementById('message');
  const shuffleButton = document.getElementById('shuffle');
  const recipientName = document.getElementById('recipient-name');
  const recipientWishes = document.getElementById('recipient-wishes');

  wishlist.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-wish')) {
      e.target.closest('.wish-item').remove();
    }
  });

  addWishButton.addEventListener('click', () => {
    const wishItemTemplate = `<li class="wish-item">
      <div class="wish">
        <textarea
          name="wish-value"
          cols="30"
          rows="2"
          class="wish-value"
        ></textarea>
        <input type="button" value="Remove" class="remove-wish" />
      </div>
    </li>`;
    wishlist.insertAdjacentHTML('beforeend', wishItemTemplate);
  });

  registerButton.addEventListener('click', async () => {
    const userData = {};
    userData.name = userName.value;
    userData.surname = userSurname.value;
    userData.wishes = Array.prototype.map.call(
      wishlist.getElementsByClassName('wish-value'),
      (wishElement) => wishElement.value
    );
    const userid = await User.register(userData);
    message.innerText = `Your id is ${userid}. Please remember it.`;
  });

  shuffleButton.addEventListener('click', async () => {
    message.innerHTML = `<div>${await Pairs.shuffle()} </div>`;
  });

  searchUserButton.addEventListener('click', async () => {
    const senderid = parseInt(searchUserId.value, 10);
    const { data: recipientsData } = await Pairs.getRecipient(senderid);
    recipientName.innerText = `${recipientsData[0].last_name} ${recipientsData[0].first_name}`;
    const wishes = recipientsData
      .sort((a, b) => a.wish_number - b.wish_number)
      .map((recipient) => `<li>${recipient.wish_text} </li>`);
    recipientWishes.innerHTML = wishes.join('');
  });
});
