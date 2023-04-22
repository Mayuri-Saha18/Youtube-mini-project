
var menuIcon = document.querySelector(".menu_icon")

var sidebar = document.querySelector(".sidebar")
var content = document.querySelector(".content")

menuIcon.onclick =function(){


    sidebar.classList.toggle("small-sidebar")

    content.classList.toggle("large-content")
}

const Api_key= "AIzaSyCYsqTHpKGidXKusrPgobFoPPEQ8_qSShQ"
document.querySelector(".logo").addEventListener("click", () => {

    window.location.href = "index.html";
});

let searchInput = document.getElementById("search_input");

searchInput.addEventListener("keydown", async function (event) {

    if (event.code === "Enter") {
       
            try {


                let inp= searchInput.value;
        
                let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${inp}&key=${Api_key}`);
                let data = await res.json();


                console.log(data.items);
                appendvideos(data.items);
        
            } 
            
            catch (error) {

                console.log(error);
                
        }


        document.querySelector(".banner").style.display = "none";

        searchInput.value = '';
        
    }

 });


const appendvideos = (data) =>{


    document.querySelector('.list_content').innerHTML = '';

    data.forEach((el) => {
        
        let vid_list = document.createElement('div');

        vid_list.classList.add('vid_list');

        let thumbnail = document.createElement('img');

        thumbnail.src = el.snippet.thumbnails.medium.url;
        thumbnail.classList.add('thumbnail');
        thumbnail.addEventListener('click', () => {


            // window.open(`https://www.youtube.com/watch?v=${el.id.videoId}`);

            let videoId = el.id.videoId;

            localStorage.setItem('videoId', videoId);
            localStorage.setItem('videoTitle', el.snippet.title);
            localStorage.setItem('videoDesc', el.snippet.description);
            localStorage.setItem('videoChannel', el.snippet.channelTitle);

            window.location.href ="video.html";
            
            // window.location.href ="play-video.html?videoId="+el.id.videoId;
        });

        let flex_div = document.createElement('div');
        flex_div.classList.add('flex-div');

        let userImg = document.createElement('img');
        userImg.src ="./images/cameron.png";

        let vid_info = document.createElement('div');
        vid_info.classList.add('vid-info');

        let title = document.createElement('a');
        title.innerHTML = el.snippet.title;
     
        let username = document.createElement('p');
        username.innerHTML = el.snippet.channelTitle;

        vid_info.append(title, username);
        flex_div.append(userImg,vid_info);
        vid_list.append(thumbnail, flex_div);

        document.querySelector('.list_content').append(vid_list);


    });
}

const videos= async() => {
    

        try {
            
    
            let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=${Api_key}`);
            let data = await res.json();

            console.log(data.items);

            append(data.items);
    
        } catch (error) {
            console.log(error);
        
            
    }
  
}

videos();

const append = (data) =>{


    document.querySelector('.list_content').innerHTML = '';

    data.forEach((el) => {
        
        let vid_list = document.createElement('div');
        vid_list.classList.add('vid_list');

        let thumbnail = document.createElement('img');
        thumbnail.src = el.snippet.thumbnails.medium.url;
        thumbnail.classList.add('thumbnail');


        thumbnail.addEventListener('click', () => {
            // window.open(`https://www.youtube.com/watch?v=${el.id.videoId}`);
            let videoId = el.id.videoId;

            localStorage.setItem('videoId', videoId);
            localStorage.setItem('videoTitle', el.snippet.title);
            localStorage.setItem('videoDesc', el.snippet.description);
            localStorage.setItem('videoChannel', el.snippet.channelTitle);
            window.location.href ="video.html";
              
            // window.location.href ="play-video.html?videoId="+el.id.videoId;
        });

        let flex_div = document.createElement('div');
        flex_div.classList.add('flex-div');

        let userImg = document.createElement('img');
        userImg.src ="./images/cameron.png";

        let vid_info = document.createElement('div');
        vid_info.classList.add('vid-info');

        let title = document.createElement('a');
        title.innerHTML = el.snippet.title;
     
        let username = document.createElement('p');
        username.innerHTML = el.snippet.channelTitle;

        vid_info.append(title, username);
        flex_div.append(userImg,vid_info);
        vid_list.append(thumbnail, flex_div);

        document.querySelector('.list_content').append(vid_list);


    });
}
