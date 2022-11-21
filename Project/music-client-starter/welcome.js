window.onload = function () {
  init();
  document.getElementById("logoutBtn").onclick = logout;
  fetchAllSongs();
};

function init() {
  document.getElementById("username").innerText =
    sessionStorage.getItem("username");
}

function logout() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("token");
  location.href = "login.html";
}
let myFavoriteMusicList = [];
let musicList = null;

function fetchAllSongs() {
  fetch("http://localhost:3000/api/music", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((songs) => {
      musicList = songs;
      printAllSongs(musicList);
    });
}
let index = 0;
function abc() {
  fetch("http://localhost:3000/api/playlist", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((songs) => {
      for (let each of songs) {
        // console.log(each)
        myFavoriteMusicList.push(each);
        document.getElementById("favorites").innerHTML += `
        <tr id=${each.id}>
              
        <td>${each.title}</td>
        <td><button class="addBtn" id=${each.songId} onclick="removeToFavorites('${each.id}')">
              <img src="minus.png" alt="" width="20px"></button>
        </td>

        <td> <button class="addBtn" onclick="playMusic('${songs.url}','${each.title}','${index}')">
           <img src="play.png" alt="" width="20px"></button>
        </td>
    </tr>
        `;
        index++;
      }

      // console.log(myFavoriteMusicList);
    });
}
abc();

//Display all songs
//=================================================================================================================//
function printAllSongs(musicList) {
  document.getElementById(
    "playlist"
  ).innerHTML = ` <tr><th></th><th>Song</th><th>Add</th></tr>`;
  let i = 1;
  for (let each of musicList) {
    fetch(`http://localhost:3000/${each.urlPath}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then(() => {
      let myTable = `
        <tr>
        <td>${i}</td>
        <td>${each.title}</td>
        <td><button class="addBtn"  id=${each.id} onclick="addToFavorites('${each.id}')">
          <img src="Plus.png" alt="" width="20px"></button></td>
        </tr>
       `;
      i++;
      document.getElementById("playlist").innerHTML += myTable;
    });
  }
  // console.log(musicList)
}

//Add to favorite list
//=================================================================================================================//

function addToFavorites(id) {
  for (let each of musicList) {
    if (each.id == id) {
      for(let all of myFavoriteMusicList){
        if(all.id == each.id || all.songId == each.id|| all.id == each.songId){
          continue;
        }
      }
      if (myFavoriteMusicList.includes(each)) {
        continue;
      } 
      else {
        // console.log(each.id);
        songId = each.id;
        fetch(`http://localhost:3000/api/playlist/add`, {
          method: "POST",
          body: JSON.stringify({
            songId: songId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        myFavoriteMusicList.push(each);

        fetch(`http://localhost:3000/${each.urlPath}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }).then((music) => {
          let myFavoriteTable = `
          <tr id=${each.id}>
              
              <td>${each.title}</td>
              <td><button class="addBtn" id=${each.id} onclick="removeToFavorites('${each.id}')">
                    <img src="minus.png" alt="" width="20px"></button>
              </td>

              <td> <button class="addBtn" onclick="playMusic('${music.url}','${each.title}','${index}')">
                 <img src="play.png" alt="" width="20px"></button>
              </td>
          </tr>
        `;
          index++;

          document.getElementById("favorites").innerHTML += myFavoriteTable;

          if (myFavoriteMusicList.length == 0) {
            document.getElementById("favorites").style.visibility = "hidden";
          } else {
            document.getElementById("favorites").style.visibility = "visible";
            document.getElementById("playListInfo").style.display = "none";
          }
        });
      }
    }
  }
}

let playingMusicIndex = 0;

async function playMusic(music, title, id) {
  document.getElementById("musicTitle").innerHTML = title;
  document.getElementById("play").src = music;
  playingMusicIndex = id;
  let arr = [];
  for (let each of myFavoriteMusicList) {
    let myPlayList = await fetch(`http://localhost:3000/${each.urlPath}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    arr.push(myPlayList.url);
  }

  let audio = document.getElementById("play");
  audio.onended = () => {
    if (playingMusicIndex == undefined) {
      playingMusicIndex = removedIndex;
    } else {
      playingMusicIndex++;
      if (playingMusicIndex >= arr.length) {
        playingMusicIndex = 0;
      }
    }
    audio.src = arr[playingMusicIndex];

    document.getElementById("musicTitle").innerHTML =
      myFavoriteMusicList[playingMusicIndex].title;
  };
}

//Remove from list
//=================================================================================================================//
let removedIndex = 0;
function removeToFavorites(id) {
  for (let i = 0; i < myFavoriteMusicList.length; i++) {
    if (myFavoriteMusicList[i].id == id) {
      removedIndex = i;
    }
  }
  id = id;
  for (let each of myFavoriteMusicList) {
    
    if (each.id == id) {
      // console.log(each.id);
      if(each.songId != null || each.songId != undefined || each.songId != NaN){
      songId = each.songId;
      }else{
        songId = each.id
      }
      fetch(`http://localhost:3000/api/playlist/remove`, {
        method: "POST",
        body: JSON.stringify({
          songId: songId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
    }
  }

  myFavoriteMusicList = myFavoriteMusicList.filter((myFav) => myFav.id != id);
  createTable(myFavoriteMusicList, id);

  if (myFavoriteMusicList.length == 0) {
    document.getElementById("favorites").style.visibility = "hidden";
    document.getElementById("playListInfo").style.display = "block";
  } else {
    document.getElementById("favorites").style.visibility = "visible";
    document.getElementById("playListInfo").style.display = "none";
  }
}

function createTable(property, id) {
  document.getElementById("favorites").innerHTML = `
        <tr>
            <th>Favorites Song</th>
            <th>remove from list</th>
            <th>play</th>
        </tr>
  `;

  for (let each of property) {
    fetch(`http://localhost:3000/${each.urlPath}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((music) => {
      let myFavoriteTable = `
          <tr id=${each.id}>
              <td>${each.title}</td>

              <td><button class="addBtn" id=${each.id} onclick="removeToFavorites('${each.id}')">
                  <img src="minus.png" alt="" width="20px"></button>
              </td>

              <td> <button class="addBtn" onclick="playMusic('${music.url}','${each.title}')">
                  <img src="play.png" alt="" width="20px"></button>
              </td>
          </tr>
        `;
      document.getElementById("favorites").innerHTML += myFavoriteTable;
    });
  }
}

//Play Next
//=================================================================================================================//

let next = document.getElementById("next");

next.onclick = async function () {
  if (playingMusicIndex == undefined) {
    playingMusicIndex = 0;
  }
  let nextMusic = playingMusicIndex;
  if (myFavoriteMusicList.length != 0) {
    if (nextMusic > myFavoriteMusicList.length - 1) {
      nextMusic = 0;
    } else {
      nextMusic++;
      if (nextMusic > myFavoriteMusicList.length - 1) {
        nextMusic = 0;
      }
    }
    let nextPlay = await fetch(
      `http://localhost:3000/${myFavoriteMusicList[nextMusic].urlPath}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    document.getElementById("musicTitle").innerHTML = "";
    document.getElementById("play").src = "";

    document.getElementById("musicTitle").innerHTML =
      myFavoriteMusicList[nextMusic].title;
    document.getElementById("play").src = nextPlay.url;
    playingMusicIndex = nextMusic;
  }
};

//Play previous
//=================================================================================================================//
let previous = document.getElementById("priv");

previous.onclick = async function () {
  let playPriv = playingMusicIndex;

  if (myFavoriteMusicList.length != 0) {
    if (playingMusicIndex == 0) {
      playPriv = myFavoriteMusicList.length - 1;
    } else {
      playPriv--;
      if (playPriv < 0) {
        playPriv = myFavoriteMusicList.length - 1;
      }
    }
    let nextPlay = await fetch(
      `http://localhost:3000/${myFavoriteMusicList[playPriv].urlPath}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    document.getElementById("musicTitle").innerHTML = "";
    document.getElementById("play").src = "";

    document.getElementById("musicTitle").innerHTML =
      myFavoriteMusicList[playPriv].title;
    document.getElementById("play").src = nextPlay.url;
    playingMusicIndex = playPriv;
  }
};

//shuffle
//=================================================================================================================//
let repeat = document.getElementById("repeat");
let shuffle = document.getElementById("shuffle");

shuffle.onclick = async function () {
  shuffle.style.display = "none";
  repeat.style.display = "block";

  let arr = [];
  for (let each of myFavoriteMusicList) {
    let me = await fetch(`http://localhost:3000/${each.urlPath}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    arr.push(me.url);
  }

  let audio = document.getElementById("play");

  audio.onended = () => {
    playingMusicIndex++;
    if (playingMusicIndex >= arr.length) {
      playingMusicIndex = 0;
    }

    let randNum = parseInt(Math.random() * myFavoriteMusicList.length);

    if (randNum == playingMusicIndex) {
      let newRand = parseInt((Math.random() + 1) * myFavoriteMusicList.length);
      if (newRand > myFavoriteMusicList.length - 1) {
        randNum = newRand - 1;
      }
    } else {
      playingMusicIndex = randNum;
      audio.src = arr[playingMusicIndex];
      document.getElementById("musicTitle").innerHTML =
        myFavoriteMusicList[playingMusicIndex].title;
    }
  };
};

//Repeat one song
//===================================================================================================//

repeat.onclick = async function () {
  shuffle.style.display = "block";
  repeat.style.display = "none";

  if (playingMusicIndex != undefined && myFavoriteMusicList.length != 0) {
    let repeatSong = await fetch(
      `http://localhost:3000/${myFavoriteMusicList[playingMusicIndex].urlPath}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    let audio = document.getElementById("play");
    audio.onended = () => {
      audio.src = repeatSong.url;
      document.getElementById("musicTitle").innerHTML = "";
      document.getElementById("musicTitle").innerHTML =
        myFavoriteMusicList[playingMusicIndex].title;
    };
  }
};

//search song
//===================================================================================================//

let searchBtn = document.getElementById("searchBtn");
searchBtn.onclick = searchSong;
async function searchSong() {
  let search = document.getElementById("search");

  let searchKey = search.value.toUpperCase().split(" ");

  if (search.value != "") {
    let response = await fetch("http://localhost:3000/api/music", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    let data = await response.json();
    let j = 1;
    for (let each of data) {
      let value = each.title.toUpperCase().split(" ");

      for (let all of value) {
        if (searchKey.includes(all)) {
          printAllSongs([each]);
          j--;
          break;
        }
      }
      j++;
    }
    if (data.length == 10 && j != 10) {
      document.getElementById("playlist").innerHTML = "No Match Found";
    }
    search.value = "";
  } else {
    printAllSongs(musicList);
  }
}
//=============================================================================================//
