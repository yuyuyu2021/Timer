'use strict';
//-----------------リアルタイムの時計----------------//
function clock(){
    const now = new Date();//現在時刻
    const month = now.getMonth();
    const day = now.getDate();
    const dayOfWeek = now.getDay() ;
    const week =["日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];
    const time =[now.getHours(),now.getMinutes(),now.getSeconds()];
    const min = String(time[1]).padStart(2,0);//2桁にする
    const sec = String(time[2]).padStart(2,0);//2桁にする
    document.getElementById('now').textContent = `${month+1}/${day}(${week}) ${time[0]}:${min}:${sec}`;//現在時刻をブラウザに表示
    refresh();
    }
    function refresh(){//1秒後にclockファンクションを実行
    setTimeout (clock, 1000);
    }
    clock();//リアルタイムの時計を表示

//-----------------リセット------------------------------//

document.getElementById('reset').onclick = function(){
    window.location.reload();
}//リセットボタンを押すと再読み込みする

//-----------------タイマー設定-----------------------------//
let set_flag = true;
if(set_flag){
document.getElementById('set').onclick = function(){
    // 「セット」をクリックするとフォーム入力した数字（文字列）を取得する
    // document.form.name属性でformの情報を取得できる

    let hour = document.form.hour.value;
    let minute = document.form.minute.value;
    let second = document.form.sec.value;
    //設定した時間・分・秒の数値(文字列)取得
    if( hour === "" ){
        hour = 0; if( minute===""){minute=0;
        }else if(second==="")second=0;}
    if( minute === "" ){
            minute = 0; if( second===""){second=0;
            }}
    if( second === "" ){
                second = 0; if( hour===""){hour=0;
                    }}
     //どこかのフォームが空欄の場合に「0」を入力したことにする。空欄だとNaNになり動かないため

     if( hour % 1 !=0 || hour < 0 ){
        document.getElementById('alert').textContent ="小数やマイナス値は使用できません";　
    } else if (minute % 1 !=0 || minute < 0){
        document.getElementById('alert').textContent ="小数やマイナス値は使用できません";
    } else if (second % 1 != 0 || second <0 ){
        document.getElementById('alert').textContent ="小数やマイナス値は使用できません";
    }//小数やマイナスを入力するとタイマーがセットされない

    else {//セットした数値が自然数だった場合の処理
        let timer = [parseInt(hour),parseInt(minute),parseInt(second)];
        //取得したタイマーの数値（文字列）を整数として配列にする。
        document.getElementById('message').textContent ='';
    //一度表示された「おつかれさまでした」を消す

        let change0 = document.getElementById('hour');
        let change1 = document.getElementById('min');
        let change2 = document.getElementById('sec');
        //HTMLのタイマー設定「00時間00分00秒」のテキスト「００」を取得

        change0.innerHTML = String(timer[0]).padStart(2,0);//時間
        change1.innerHTML = String(timer[1]).padStart(2,0);//分
        change2.innerHTML = String(timer[2]).padStart(2,0);//秒
        //HTMLの00時間00分00秒のテキスト「００」をタイマーの時間(データ型)に書き換える

    //-----------------タイマー表示----------------//
        let flag = true;
        let i = 0;

        document.getElementById('start').onclick = function(){
        //スタートをクリックするとタイマーが動く

        let cancel = document.getElementById('set');
        cancel.style.backgroundColor = "rgba(203, 203, 207,0.7)";
        //setボタンが使えない間グレーになる


        // document.getElementById('start').id= 'start-cancel';
        i++;



        let rest = `${timer[0]*60*60*1000 + timer[1]*60*1000 + timer[2]*1000}`;
        //タイマーの設定時間をミリ秒に変換

                recalc();//タイマーを動かす
                set_flag = false;//スタート押してからはセット押せない(リセット押してからならセットできる)
                    function recalc(){//残り時間から−1秒にする-------------------
                        if(flag){
                        if(rest >0){
                            rest = rest -1000;
                            let rest_h = Math.floor(rest / 1000 / 60/ 60);//時間
                            let rest_m = Math.floor(rest/ 1000 / 60) % 60;//分
                            let rest_s = Math.floor(rest / 1000 ) % 60;//秒

                            let rest_hour = String(rest_h).padStart(2,0);//2桁にする
                            let rest_min = String(rest_m).padStart(2,0);//2桁にする
                            let rest_sec = String(rest_s).padStart(2,0);//2桁にする

                            change0.innerHTML = rest_hour;//HTMLの時間を書き換える
                            change1.innerHTML = rest_min;//HTMLの分を書き換える
                            change2.innerHTML = rest_sec;//HTMLの秒を書き換える
                            refresh();

                        } else if (rest === 0){//タイマーが0になった時の処理
                            document.getElementById('message').textContent ='おつかれさまでした!';
                            let music = new Audio("free_1368.mp3");
                            music.play();  // 音声再生
                        }

                        function refresh() {//1秒後にreaclc(-1秒にする)を実行
                            setTimeout(recalc,1000)
                        }
                        if(i >0){
                        document.getElementById('stop').onclick=function(){//------------
                            //タイマーが動いてる時、stopを押すとrecalcファンクションの条件がfalseになるので止まる
                            flag = false;
                            // document.getElementById('start-cancel').id ='start';
                        }//------------------------stopボタンここまで-------------------------
                        document.getElementById('start').onclick = function(){
                            //start押すとreclacファンクションの条件がtrueになるのでタイマーが動く
                            flag = true;
                            recalc();
                        }
                        document.getElementById('set').onclick = function(){
                            return false;
                            }//スタートを押してからセットを押しても機能しない。

                }
            }//----------------recalcここまで-------------------------
            }//------------スタートファンクションここまで-------------------------
        }//------------自然数の場合の処理ここまで-------------------------
        }//------------セットファンクションここまでーーーーーーーーーーーーーーーーーーー
    }//------------ーーーーセットフラグここまでーーーーーーーーーーーーーーー


}