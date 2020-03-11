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
`;

// open menu
setTimeout(() => document.querySelector('.bar').classList.add('selected'), 0);

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

document.querySelectorAll('.bar > div').forEach( div =>
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
