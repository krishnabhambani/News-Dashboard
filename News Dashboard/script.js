// API key taken from NewsAPI
const API_KEY = 'e63ac6691e6b4b9d9415aaf4c523236f'; 
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country-select');
    const categorySelect = document.getElementById('category-select');
    const newsContainer = document.getElementById('news-container');

    async function fetchNews(country, category) {
        try {
            const url = `${BASE_URL}?country=${country}&category=${category}&apiKey=${API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data.status !== 'ok') {
                throw new Error(`API Error: ${data.message}`);
            }

            displayNews(data.articles);
        } catch (error) {
            displayError(error.message);
        }
    }

    function displayNews(articles) {
        newsContainer.innerHTML = '';
        articles.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');
            newsCard.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(newsCard);
        });
    }

    countrySelect.addEventListener('change', () => {
        const country = countrySelect.value;
        const category = categorySelect.value;
        fetchNews(country, category);
    });

    categorySelect.addEventListener('change', () => {
        const country = countrySelect.value;
        const category = categorySelect.value;
        fetchNews(country, category);
    });

    fetchNews(countrySelect.value, categorySelect.value);
});
