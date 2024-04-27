import './App.css';
import {useState} from "react";
import bulletin from "./Bulletin";

function App() {
  let [post,setPost]=useState(['태화산','가야산','월출산'])
  let [likes,setLikes]=useState([0,0,0])
    let[dislikes,setDislikes]=useState([0,0,0])
      let [dates,setDates]=useState(['3월1일','2월10일','3월17일'])
    let [modal, setModal]=useState(false)
    let count=1;
    // let content=['article 1','article 2','article 3','article 4'].map(function (element){
    //     //console.log(element);
    //     return '글내용'+(count++)
    // });
    let [selectedPostIndex,setSelectedPostIndex]=useState(0)
    let [inputValue,setInputValue]=useState(' ')
  function changeLikes(index) {
      let copyLikes=[...likes]
      copyLikes[index]=copyLikes[index]+1;
      setLikes(copyLikes)
  }
  function changeDislikes(index) {
      let copyDislikes=[...dislikes]
      copyDislikes[index]=copyDislikes[index]-1;
      setDislikes(copyDislikes)
  }
  return (
      <div className="App">
          <div className="black-nav">
              <h4>Mountaining</h4>
              <p><a href="/bulletin">게시판</a></p>
          </div>
          <h4 style={{color: "green", fontSize: "22px"}}>가볼만한 산악 등반</h4>

          {post.map(function (title, index) {
              return (
                  <div className="list" key={index}>
                      <h4 onClick={() => {
                          setModal(!modal);
                          setSelectedPostIndex(index)
                      }}>{title}
                          <span onClick={(e) => {
                              e.stopPropagation()
                              let copyLikes = [...likes]
                              copyLikes[index] = copyLikes[index] + 1;
                              setLikes(copyLikes)
                          }}>👍</span>{likes[index]}
                          <span onClick={(e) => {
                              e.stopPropagation()
                              let copyDislikes = [...dislikes]
                              copyDislikes[index] = copyDislikes[index] + 1;
                              setDislikes(copyDislikes)
                          }}>👎</span>{dislikes[index]}</h4>
                      <p >날짜: {dates[index]}</p>
                      {/*지우기 버튼으 날짜 옆에 오도록 하자*/}
                      <button onClick={()=>{
                            let copyPost=[...post]
                          copyPost.splice(index,1)
                          setPost(copyPost)
                          let copyLikes=[...likes]
                          copyLikes.splice(index,1)
                          setLikes(copyLikes)
                          let copyDislikes=[...dislikes]
                          copyDislikes.splice(index,1)
                          setDislikes(copyDislikes)
                      }}>
                          지우기
                      </button>

                  </div>

              )
          })}


          &nbsp;

          <input onChange={(e) => {
            //  console.log(e.target.value)
              setInputValue(e.target.value)
          }}/>
          &nbsp;
          <button onClick={()=>{
              let copy=[...post]
              copy.unshift(inputValue)
              setPost(copy)
              const today = new Date();
              const month = today.getMonth() + 1;
              // 현재 일을 가져와서 정수형으로 저장
              const day = today.getDate();
              // 날짜를 'x월 xx일 발행' 형식의 문자열로 포맷팅
              const formattedDate = `${month}월 ${day}일 발행`;
              let copyDates=[...dates];
              copyDates.unshift(formattedDate);//신규글 제목을 가장 위에 위치
              setDates(copyDates) //신규글 제목 state 갱신
            let copyLikes=[...likes]
              copyLikes.unshift(0)
              setLikes(copyLikes);
              let copyDisLikes=[...dislikes]
              copyDisLikes.unshift(0)
              setDislikes(copyDisLikes)
          }}
          >새글 작성</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={() => {
              let post_update = [...post]
              post_update.sort()
              setPost(post_update)
          }}>제목 정렬
          </button>
          {
              modal == true ? <Bulletin color={'skyblue'} post={post}
                                        dates={dates} likes={likes}
                                        setPost={setPost} dislikes={dislikes}
                                        selectedPostIndex={selectedPostIndex}/> : null
          }


      </div>
  );
}

function Bulletin(props) {
    // let time=new Date();
    const {color, post, dates, likes, dislikes, selectedPostIndex} = props;
    const posts = post[selectedPostIndex];
    const date=dates[selectedPostIndex]
    const like=likes[selectedPostIndex];
    const dislike=dislikes[selectedPostIndex];

    return(
        <div className="modal" style={{background: color}}>

            <h4>등산일정: {posts}</h4>
            <p>날짜:{date}</p>
            <p>모집인원</p>
            <p> 등산경험 :
                좋아요 {like} 싫어요 {dislike}
            </p>
            <button onClick={() => {
                // display: `${props => props.visible ? 'block' : 'none'}`;

            }}>닫기
            </button>
        </div>

    )
}

export default App;
