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

document.querySelector('.menu-icon').addEventListener('click', () =>
    document.querySelectorAll('.bar > div').forEach( div => {
        if (div.classList.contains('selected')) {
            div.classList.remove('selected');
            document.querySelector('.search').innerHTML = `
                <i class="fas fa-search fa-lg"></i>
                Search
            `;
        } else {
            div.classList.add('selected');
        }
    })
);

document.querySelector('.menu-icon').onmouseover = () =>
    document.querySelectorAll('.bar > div').forEach( div => {
        if (!div.classList.contains('over')) {
            div.classList.add('over');
        }
    });

document.querySelectorAll('.bar > div').forEach( div =>
    div.onmouseover = () => document.querySelectorAll('.bar > div').forEach(div =>
        div.classList.add('selected')));

document.querySelector('.menu-icon').onmouseout = e =>
    document.querySelectorAll('.bar > div').forEach( div => {
        if (div.classList.contains('selected')) return;

        div.classList.remove('over');
    });

document.querySelector('.search').addEventListener('click', e => {
    const search = e.currentTarget;

    if (search.querySelector('input')) return;

    search.innerHTML = `
        <i class="fas fa-search fa-lg"></i>
        <input class="input-search">
    `;
    search.querySelector('input').focus();
});
