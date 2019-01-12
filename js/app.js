//Get the codes to use GitHub's API
const client_id = "Iv1.33b073ada80a0a4e";
const client_secret = "73ce2fd918855c9a6af839cd8cd1555569083831";

// Get all the Users from the GitHub API and keep it in 'fetchUsers'
const fetchUsers = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);

    const data = await api_call.json();
    return { data }
};

// Get the information of the Repos and keep it in 'fetchUsersRepos'
const fetchUsersRepos = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}/repos`);

    const data = await api_call.json();
    return { data }
};

//Get the information of the searched user and keep it in 'showData'
const showData = ()=>{
    
    fetchUsers(document.getElementById("input").value)
    .then((res)=>{
        
        if(res.data.message !== "Not Found"){    
            document.getElementById("username").innerHTML = `<p>@${res.data.login}</p>`;
            if(res.data.name !== null){
                document.getElementById("fullName").innerHTML = `<h3>${res.data.name}</h3>`;
            } else {
                document.getElementById("fullName").innerHTML = '<h3></h3>';
            };
            if(res.data.bio !== null){
                document.getElementById("bio").innerHTML = `<p>${res.data.bio}</p>`;
            } else {
            document.getElementById("bio").innerHTML = '<p></p>';
            };
            document.getElementById("userImage").innerHTML = `<img id="innerUserImage"src="${res.data.avatar_url}">`;
        } else {
            document.getElementById("userImage").innerHTML = '';
            document.getElementById("username").innerHTML = '';
            document.getElementById("fullName").innerHTML = '';
            document.getElementById("bio").innerHTML = '';
            document.getElementById("userImage").innerHTML = '<div class="alert alert-danger" role="alert">This user does not exist. Please, try again.</div>';
        };
    });
};

//Get the information of the searched user's repositories and keep it in 'showRepos'
const showRepos = ()=>{
    
    fetchUsersRepos(document.getElementById("input").value)
    .then((res)=>{
        
        document.getElementById("header").innerHTML = "";
        document.getElementById("allRepositories").innerHTML = '';
        if(res.data[0].message !== "Not Found") {
            let header = document.createElement("h1");
            header.setAttribute("class", "header");
            header.innerHTML = "Repositories"
            document.getElementById("header").appendChild(header)
        };
        
        res.data.forEach(repository =>{
            if(repository.message !== "Not Found"){
                let parent = document.createElement("div");
                let firstDiv = document.createElement("div");
                let secondDiv = document.createElement("div");
                let starImage = document.createElement("img");
                let forkImage = document.createElement("img");
                let repoName = document.createTextNode(`${repository.name}`);
                let numberOfStars = document.createTextNode(`${repository.stargazers_count}`);
                let numberOfForks = document.createTextNode(`${repository.forks}`);

                parent.setAttribute("class", "singleRepository");
                starImage.setAttribute("src", "./img/star.png");
                starImage.setAttribute("id", "image");
                forkImage.setAttribute("src", "./img/fork.png");
                forkImage.setAttribute("id", "imageFork");
                firstDiv.setAttribute("class", "repositoriesClass");
                secondDiv.setAttribute("class", "repositoriesClass");

                firstDiv.appendChild(repoName);
                secondDiv.appendChild(starImage);
                secondDiv.appendChild(numberOfStars);
                secondDiv.appendChild(forkImage);
                secondDiv.appendChild(numberOfForks);
                parent.appendChild(firstDiv);
                parent.appendChild(secondDiv);

                document.getElementById("allRepositories").appendChild(parent);
            };
        });  
    });
};

//Show all the information when you click the Search button
document.getElementById("form").addEventListener("submit", (e) =>{
    e.preventDefault();
    if(document.getElementById("allBeforeRequest")){
        document.getElementById("allBeforeRequest").setAttribute("id", "allAfterRequest")
    };
    showData();
    showRepos();
});



