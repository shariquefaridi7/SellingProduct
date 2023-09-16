// Define the API URL
const apiUrl = 'https://crudcrud.com/api/175fd45e5d76430ea9a0c3f2de262de0/Skin';

// Function to fetch and display products
async function fetchProducts() {
    let response = await axios.get(apiUrl)

    try {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear previous data

        response.data.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('alert', 'alert-primary', 'mt-2');
            productItem.innerHTML = `
                 <h2>Products</h2>
                <p><strong>Product Name:</strong> ${product.productName}</p>
                <p><strong>Selling Price:</strong> Rs.${product.sellingPrice}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <button class="btn btn-danger delete-button" data-id="${product._id}">Delete</button>
            `;
            productList.appendChild(productItem);
        });
    } catch (error) {
        console.log(error)
    }

}

// Initial data fetch and display
fetchProducts();

// Function to add a product
document.getElementById('addProduct').addEventListener('click', () => {
    const sellingPrice = document.getElementById('sellingPrice').value;
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;

    // Validate input fields
    if (!sellingPrice || !productName) {
        alert('Please fill in all fields.');
        return;
    }

    // Create a new product object
    const newProduct = {
        sellingPrice: parseFloat(sellingPrice),
        productName,
        category,
    };

    // Send data to the API to add a new product
    async function Post()  {
        try {
            await axios.post(apiUrl, newProduct)

            // Clear input fields
            document.getElementById('sellingPrice').value = '';
            document.getElementById('productName').value = '';

            // Fetch and display updated products
            console.log("checkinggg")
            fetchProducts();

        } catch (error) {
            console.log(error)
        }
    }

Post()


});

// Event delegation for delete buttons
document.getElementById('productList').addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-button')) {
        const dataId = e.target.getAttribute('data-id');
        const deleteUrl = `${apiUrl}/${dataId}`; // Construct the delete URL

        try {
            // Send a DELETE request to remove the product
            await axios.delete(deleteUrl)

            // Fetch and display updated products after deletion
            fetchProducts();

        } catch (error) {
            console.log(error)
        }

    }
});