

document.querySelector(".logo").addEventListener("click", () => {

    window.location.href = "index.html";
});

const Api_key= "AIzaSyCYsqTHpKGidXKusrPgobFoPPEQ8_qSShQ"

let video_id = localStorage.getItem('videoId');
let video_title = localStorage.getItem('videoTitle');

let video_desc = localStorage.getItem('videoDesc');
let video_channel = localStorage.getItem('videoChannel');

function appendvideos() {


    let iframe = document.createElement('iframe');

    iframe.src = `https://www.youtube.com/embed/${video_id}`;
    iframe.style.width = '100%';    
    iframe.style.height = '450px';
    iframe.setAttribute('allowfullscreen', ''); // added line
    iframe.style.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";


    iframe.classList.add('iframeVideo');

    let title = document.createElement('h3');
    title.innerHTML = video_title;

    let desc = document.createElement('p');
    desc.innerHTML = video_desc;



    document.querySelector('.play-video').append(iframe, title, desc);
}
appendvideos();

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

    document.querySelector('.right-sidebar').innerHTML = '';
    data.forEach((el) => {
        
        let vid_list = document.createElement('div');
        vid_list.classList.add('side_video_list');

        let a = document.createElement('a');
        a.classList.add('small-thumbnail');

        let thumbnail = document.createElement('img');
        thumbnail.src = el.snippet.thumbnails.medium.url;
      
        thumbnail.addEventListener('click', () => {

            let videoId = el.id.videoId;

            localStorage.setItem('videoId', videoId);
            localStorage.setItem('videoTitle', el.snippet.title);
            localStorage.setItem('videoDesc', el.snippet.description);
            localStorage.setItem('videoChannel', el.snippet.channelTitle);
            window.location.href ="video.html";
              
        });

        a.append(thumbnail);

        let vid_info = document.createElement('div');
        vid_info.classList.add('vid-info');

        let title = document.createElement('a');
        title.innerHTML = el.snippet.title;
     
        let username = document.createElement('p');
        username.innerHTML = el.snippet.channelTitle;



        vid_info.append(title, username);
        vid_list.append(a, vid_info);

        document.querySelector('.right-sidebar').append(vid_list);

    });
}


