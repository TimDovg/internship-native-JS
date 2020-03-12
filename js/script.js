document.querySelector('main').innerHTML = `
<div class="navigation">
        <div class="menu">
            <div class="menu-icon">
                <i class="fas fa-bars fa-2x"></i>
            </div>
            <div class="bar">
                <div class="search">
                    <i class="fas fa-search fa-lg"></i>
                    Search
                </div>
                <div class="downloads">
                    <i class="fas fa-download fa-lg"></i>
                    Downloads
                </div>
                <div class="vector">
                    <i class="fas fa-vector-square fa-lg"></i>
                    Vector Illustration
                </div>
                <div class="photoshop">
                    <i class="fab fa-adobe fa-lg"></i>
                    Photoshop Files
                </div>
                <div class="settings">
                    <i class="fas fa-cog fa-lg"></i>
                    Settings
                </div>
                <div class="help">
                    <i class="fas fa-question-circle fa-lg"></i>
                    Help
                </div>
                <div class="archives">
                    <i class="fas fa-archive fa-lg"></i>
                    Archives
                </div>
                <div class="articles">
                    <i class="fas fa-newspaper fa-lg"></i>
                    Articles
                </div>
                <div class="images">
                    <i class="fas fa-images fa-lg"></i>
                    Images
                </div>
                <div class="videos">
                    <i class="fas fa-video fa-lg"></i>
                    Videos
                </div>
            </div>
        </div>
        <div class="codrops">
            <i class="fas fa-arrow-left fa-sm"></i>
            &nbsp; CODROPS
        </div>
        <div class="demo">
            PREVIOUS DEMO
        </div>
        <div class="back">
            <i class="fas fa-tint fa-sm"></i>
            &nbsp; BACK TO THE CODROPS ARTICLE
        </div>
    </div>
    <div class="content">
        <div class="registration">
            <label class="input-no-selection">
                Введите страну<br>
                <input class="default-input">
                <div class="reset">x</div>
                <div class="display-countries"></div>
            </label>
            <button class="save-no-selection">Save</button>
            <label class="input-with-selection">
                Выберите страну<br>
                <input class="default-input">
                <div class="reset">x</div>
                <div class="display-countries"></div>
            </label>
            <button class="save-with-selection">Save</button>
        </div>
    </div>
`;

// open menu
document.querySelector('.bar').classList.add('selected');
// recently countries
if (!localStorage.getItem('selected-countries')) {
    localStorage.setItem('selected-countries', '');
}

document.querySelector('.menu-icon').addEventListener('click', () => {
    const bar = document.querySelector('.bar');

    if (bar.classList.contains('selected')) {
        bar.classList.remove('selected', 'over');
        document.querySelector('.search').innerHTML = `
                <i class="fas fa-search fa-lg"></i>
                Search
            `;
    } else {
        bar.classList.add('selected');
    }
});

document.querySelector('.menu-icon').onmouseover = () => {
    const bar = document.querySelector('.bar');

    if (!bar.classList.contains('over')) {
        bar.classList.add('over');
    }

};

document.querySelectorAll('.bar > div').forEach(div =>
    div.onmouseover = () => document.querySelector('.bar').classList.add('selected')
);

document.querySelector('.menu-icon').onmouseout = () => {
    const bar = document.querySelector('.bar');

    if (bar.classList.contains('selected')) return;

    bar.classList.remove('over');
};

document.querySelector('.search').addEventListener('click', e => {
    const search = e.currentTarget;

    if (search.querySelector('input')) return;

    search.innerHTML = `
        <i class="fas fa-search fa-lg"></i>
        <input class="input-search">
    `;
    search.querySelector('input').focus();
});

window.addEventListener('click', e => {
    const bar = document.querySelector('.bar');
    const menu = document.querySelector('.menu-icon');

    if (bar === e.target || bar === e.target.parentNode || bar === e.target.parentNode.parentNode) return;
    if (menu === e.target || menu === e.target.parentNode || menu === e.target.parentNode.parentNode) return;

    if (document.querySelector('.search')) {
        document.querySelector('.search').innerHTML = `
                <i class="fas fa-search fa-lg"></i>
                Search
            `;
    }
    bar.classList.remove('selected', 'over');
});

//content
document.querySelectorAll('.reset').forEach(button => button.addEventListener('click', () => {
    button.parentNode.querySelector('input').value = '';
    button.style.display = '';
    button.parentNode.querySelector('.display-countries').style.display = '';
}));

const getCountriesByString = str => fetch(`https://restcountries.eu/rest/v2/name/${str}`)
    .then(r => r.json());

const renderCountriesBySearch = (container, countries, countryName) => {
    if (countries.length === 0) {
        container.innerHTML = `No options`;
    } else {
        const selectedCountries = localStorage.getItem('selected-countries').split('??');
        const re = new RegExp(countryName, 'ig');

        selectedCountries.pop();
        container.innerHTML = ``;
        selectedCountries.forEach(country => {
            if (re.test(country)) {
                container.innerHTML += `
                    <div class="country">
                            <div class="name">${country}</div>
                            <div class="recently">recently</div>
                        </div>
                `;
            }
        });
        countries.forEach(country => container.innerHTML += `
                <div class="country">
                    <div class="name">${country.name}</div>
                    <div class="alt-name">${country.altSpellings[0] || ''}</div>
                </div>
            `);
    }
};

const debounce = (f, ms) => {
    let isCooldown = false;

    return function() {
        if (isCooldown) return;

        f.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => isCooldown = false, ms);
    };

};

const renderCountriesBySearchDebounced = debounce(renderCountriesBySearch, 1000);

document.querySelectorAll('.registration input').forEach(input => {
    const resetButton = input.parentNode.querySelector('.reset');

    input.addEventListener('keypress', () => {
        if (!resetButton.style.display) {
            resetButton.style.display = 'block';
        }
    });

    input.addEventListener('keyup', () => {
        let country = input.value.trim();
        const container = input.parentNode.querySelector('.display-countries');

        if (country === '') {
            resetButton.style.display = '';
            container.style.display = '';
            return;
        }

        getCountriesByString(country)
            .then(countries => {
                container.style.display = 'block';

                if (countries.status === 404) {
                    container.innerHTML = `No options`;
                } else {
                    renderCountriesBySearchDebounced(container, countries, country);
                }
            })
    })
});

window.addEventListener('click', e => {
    const container = document.querySelectorAll('.display-countries');

    if (!e.target.classList.contains('display-countries') && !e.target.classList.contains('default-input')) {
        container.forEach(container => container.style.display = '');
    }
});

document.querySelectorAll('.display-countries').forEach(container =>
    container.addEventListener('click', e => {
        let countryName;
        let input = container.parentNode.querySelector('input');

        if (e.target.classList.contains('name') || e.target.classList.contains('alt-name')) {
            countryName = e.target.parentNode.querySelector('.name').innerHTML.trim();
        } else if (e.target.classList.contains('country')) {
            countryName = e.target.querySelector('.name').innerHTML.trim();
        }
        if (countryName) {
            input.value = countryName;
        }
    })
);

document.querySelector('.save-no-selection').addEventListener('click', () => {
    let selectedCountries = localStorage.getItem('selected-countries');
    let countryName = document.querySelector('.input-no-selection input').value.trim();

    if (!localStorage.getItem('selected-countries').split('??').includes(countryName)) {
        selectedCountries += `${countryName}??`;
        localStorage.setItem('selected-countries', selectedCountries);
    }

    console.log(`saved ${countryName}`);
});

document.querySelector('.save-with-selection').addEventListener('click', () => {
    let selectedCountries = localStorage.getItem('selected-countries');
    let countryName = document.querySelector('.input-with-selection input').value.trim();

    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(r => r.json())
        .then(response => {
          if (response.status === 404) {
              throw `${countryName} doesn't exist!`;
          } else {
              return response.map(country => country.name);
          }
        })
        .then(countries => {
            if (countries.includes(countryName)) {
                if (!localStorage.getItem('selected-countries').split('??').includes(countryName)) {
                    selectedCountries += `${countryName}??`;
                    localStorage.setItem('selected-countries', selectedCountries);
                    console.log(`saved ${countryName}`);
                } else {
                    console.log(`passed ${countryName}, but already has been included`);
                }
            } else {
                console.log(`saved ${countryName}`);
            }
        })
        .catch(err => console.log(err))
    ;
});

