const apiKey = "AIzaSyBzClcGDgGHpIIcAGjrIETbHEunvJqHpOI";
const baseUrl = "https://www.googleapis.com/youtube/v3";
let inputbtn = document.querySelector(".nav-search-bar input");
let videoContainer = document.getElementsByClassName("video-container")[0];


function getTimeOfvideo(publishTime){
    const publishDate = new Date(publishTime);
    const currentDate = new Date();
   
    const secondGap = (currentDate.getTime()-publishDate.getTime())/1000;

    const secondPerDay = 60*60*24;
    const secondPerWeek = 7*secondPerDay;
    const secondPerMonth = 30*secondPerDay;
    const secondPerYear = 365*secondPerDay;

    if(secondGap<secondPerDay){
        return `${Math.floor((secondGap/60*60))} hrs ago`;
    }
    if(secondGap<secondPerWeek){
        return `${Math.floor(secondGap/secondPerDay)} days ago`;
    }
    if(secondGap<secondPerMonth){
        return `${Math.floor(secondGap/secondPerWeek)} weeks ago`;
    }
    if(secondGap<secondPerYear){
        return `${Math.floor(secondGap/secondPerMonth)} months ago`;
    }
    
     return `${Math.floor(secondGap/secondPerYear)} years ago`;
    
}

async function getVideoStatistic(videoId){
    const url = `${baseUrl}/videos?key=${apiKey}&part=statistics&id=${videoId}`;
    try{
        let responce = await fetch(url);
        let result = await responce.json();
        return result.items[0].statistics;
    }
    catch(error){
        alert(error);
    }

}
function viewCount(views){
    if(views<1000){
        return `${views} Views`;
    }
    if(views<1000000){
        return `${Math.floor(views/1000)}K Views`;
    }
    return `${Math.floor(views/1000000)}M Views`
}

async function getChannelDetails(channelId){
    const url = `${baseUrl}/channels?key=${apiKey}&id=${channelId}&part=snippet`;
    try{
        let responce = await fetch(url);
        let result = await responce.json();
    
        return result.items[0].snippet.thumbnails.high.url;
    }
    catch(error){
        alert(error);
    }
   
}

function renderVideo(arr){
    videoContainer.innerHTML="";
    // console.log(arr[0].snippet.thumbnails)
    arr.forEach(element => {
            let videoCart= document.createElement("div");
            videoCart.className="video-cart";
            videoCart.innerHTML=
             `<div class="thumbnail">
                <img src="${element.snippet.thumbnails.high.url}" alt="thumbnail">
                <p class="duration">23:16</p>
            </div>
            <div class="video-details">
                <div class="profile-logo"><img src="${element.channelLogoUrl}" alt=""></div>
                <div class="details">
                    <h5 class="video-name">${element.snippet.title}</h5>
                    <p class="channel-name">${element.snippet.channelTitle}</p> 
                    <p class="views-time">${viewCount(element.statistics.viewCount)}  . ${getTimeOfvideo(element.snippet.publishTime)}</p>     
                </div>
            </div>`
            
          videoContainer.appendChild(videoCart)
       
       
     
    });
}

async function getData(searchString){
    const url= `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=20`;
    try{
        let responce = await fetch(url);
        let data = await responce.json();
        for(let i=0;i<data.items.length;++i){
            let currentVideoId = data.items[i].id.videoId;
            let channelId = data.items[i].snippet.channelId;
        
            let statistics = await getVideoStatistic(currentVideoId);
            let channelLogoUrl = await getChannelDetails(channelId);    
            data.items[i].statistics = statistics;
            data.items[i].channelLogoUrl = channelLogoUrl;
        }
        renderVideo(data.items);
    }
    catch(error){
        alert(error);
    }
}

inputbtn.addEventListener("keyup",(event)=>{
    if(event.key==="Enter"||event.keyCode===13){
        let searchString =inputbtn.value;
     getData(searchString);
     }
 })
    //item=  {
    //     "kind": "youtube#searchResult",
    //     "etag": "Dn_HjQZj7iXCRkRlNQXL3xxXTxE",
    //     "id": {
    //         "kind": "youtube#video",
    //         "videoId": "_O_9HUZvJK4"
    //     },
    //     "snippet": {
    //         "publishedAt": "2023-07-31T13:18:46Z",
    //         "channelId": "UCJsApDpIBPpRRg0n9ZVmKAQ",
    //         "title": "Weather obsession of Bangalore people📈🤣 #shorts #ahmedmasood #bangalore #ytshorts",
    //         "description": "",
    //         "thumbnails": {
    //             "default": {
    //                 "url": "https://i.ytimg.com/vi/_O_9HUZvJK4/default.jpg",
    //                 "width": 120,
    //                 "height": 90
    //             },
    //             "medium": {
    //                 "url": "https://i.ytimg.com/vi/_O_9HUZvJK4/mqdefault.jpg",
    //                 "width": 320,
    //                 "height": 180
    //             },
    //             "high": {
    //                 "url": "https://i.ytimg.com/vi/_O_9HUZvJK4/hqdefault.jpg",
    //                 "width": 480,
    //                 "height": 360
    //             }
    //         },
    //         "channelTitle": "Ahmed Masood",
    //         "liveBroadcastContent": "none",
    //         "publishTime": "2023-07-31T13:18:46Z"
    //     },
    //     "statistics" :
    // }

    // {
    //     "kind": "youtube#videoListResponse",
    //     "etag": "CCyctgrsO46tCI064TFD94IquEk",
    //     "items": [
    //         {
    //             "kind": "youtube#video",
    //             "etag": "K4L6n5nVy_ub8A5ghATm-S2E7j8",
    //             "id": "de7A-13MpEI",
    //             "statistics": {
    //                 "viewCount": "114",
    //                 "likeCount": "14",
    //                 "favoriteCount": "0",
    //                 "commentCount": "2"
    //             }
    //         }
    //     ],
    //     "pageInfo": {
    //         "totalResults": 1,
    //         "resultsPerPage": 1
    //     }
    // }
