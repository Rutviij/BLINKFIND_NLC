

//run evdryting only after html page finishes loading
document.addEventListener('DOMContentLoaded', function() {
  //grab elements from teh page
   const itemsContainer = document.getElementById('itemsContainer');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const claimModal = document.getElementById('claimModal');
  const closeModal = document.getElementById('closeModal');
  const claimForm = document.getElementById('claimForm');
  const modalAlertContainer = document.getElementById('modalAlertContainer');


//store items lodaded from the system
  let allItems = [];


//load items from the system
  loadItems();


//gets appproved items from the api or localstorage
  async function loadItems() {
      try {
          allItems = await getApprovedItems();
          renderItems(allItems);
      } catch (error) {
          console.error('Error loading items:', error);
          itemsContainer.innerHTML = '<div class="empty-state"><p>Error loading items. Please refresh the page.</p></div>';
      }
  }


//display items on the page
  function renderItems(items) {
   //if items are not hter show empty
      if (items.length === 0) {
          itemsContainer.innerHTML = '<div class="empty-state"><h3>No items found</h3><p>Check back later or try a different search.</p></div>';
          return;
      }


//item card with html
      itemsContainer.innerHTML = items.map(item => `
          <div class="item-card">
              ${item.image_url
                  ? `<img src="${item.image_url}" alt="${item.name}" class="item-image">`
                  : `<div class="item-image" style="display: flex; align-items: center; justify-content: center; font-size: 50px;"></div>`
              }
              <div class="item-details">
                  <h3>${escapeHtml(item.name)}</h3>
                  <p><strong>Category:</strong> ${escapeHtml(item.category)}</p>
                  <p><strong>Location Found:</strong> ${escapeHtml(item.location)}</p>
                  <p>${escapeHtml(item.description.substring(0, 100))}${item.description.length > 100 ? '...' : ''}</p>
                  <div class="item-meta">
                      <span class="item-date">Found: ${formatDate(item.date_found)}</span>
                      <span class="item-status status-available">Available</span>
                  </div>
                  <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="openClaimModal('${item.id}', '${escapeHtml(item.name)}')">Claim This Item</button>
              </div>
          </div>
      `).join('');
  }


//filters items when user types or selects category
  function filterItems() {
      const searchTerm = searchInput.value.toLowerCase();
      const category = categoryFilter.value;




      const filtered = allItems.filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                                item.description.toLowerCase().includes(searchTerm) ||
                                item.location.toLowerCase().includes(searchTerm);
          const matchesCategory = !category || item.category === category;
          return matchesSearch && matchesCategory;
      });




      renderItems(filtered);
  }


//refilter items whenever user types or changes category
  searchInput.addEventListener('input', filterItems);
  categoryFilter.addEventListener('change', filterItems);


//opens a claim popup
  window.openClaimModal = function(itemId, itemName) {
      document.getElementById('claimItemId').value = itemId;
      document.getElementById('claimItemName').value = itemName;
      claimModal.classList.add('active');
      document.body.style.overflow = 'hidden';
  };


//when close button is clicked
  closeModal.addEventListener('click', () => {
      claimModal.classList.remove('active');
      document.body.style.overflow = '';
      claimForm.reset();
      modalAlertContainer.innerHTML = '';
  });


//when clicked out of the box
  claimModal.addEventListener('click', (e) => {
      if (e.target === claimModal) {
          claimModal.classList.remove('active');
          document.body.style.overflow = '';
          claimForm.reset();
          modalAlertContainer.innerHTML = '';
      }
  });


//when claim form is submitted
  claimForm.addEventListener('submit', async (e) => {
      e.preventDefault();




      const submitBtn = claimForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      //show loading
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;




      try {
       //gather claim data
          const claimData = {
              item_id: document.getElementById('claimItemId').value,
              item_name: document.getElementById('claimItemName').value,
              claimant_name: document.getElementById('claimantName').value,
              claimant_email: document.getElementById('claimantEmail').value,
              claimant_phone: document.getElementById('claimantPhone').value,
              description: document.getElementById('claimDescription').value,
              status: 'pending'
          };


//send claim to api or localstorage
          await addClaim(claimData);
          console.log(claimData);



          modalAlertContainer.innerHTML = '<div class="alert alert-success">Claim submitted successfully! You will be contacted soon.</div>';
          claimForm.reset();




          setTimeout(() => {
              claimModal.classList.remove('active');
              document.body.style.overflow = '';
              modalAlertContainer.innerHTML = '';
          }, 2000);




      } catch (error) {
          console.error('Error submitting claim:', error);
          modalAlertContainer.innerHTML = '<div class="alert alert-error">Error submitting claim. Please try again.</div>';
      } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
      }
  });


//
  function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
  }


//formats dates nicely
  function formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
  }
});






