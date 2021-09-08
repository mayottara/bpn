(function() {
  'use strict';
  const btn = document.getElementById('today');
  const mor_bpmax_ave = document.getElementById('mor_bpmax_ave')
  const mor_bpmin_ave = document.getElementById('mor_bpmin_ave')
  var mor_maxdata = document.getElementsByClassName('mor_max')
  var mor_mindata = document.getElementsByClassName('mor_min')
  var mor_puldata = document.getElementsByClassName('mor_pul')
  var nig_maxdata = document.getElementsByClassName('nig_max')
  var nig_mindata = document.getElementsByClassName('nig_min')
  var nig_puldata = document.getElementsByClassName('nig_pul')
  var day = document.getElementsByClassName('day')
/*-------------------------------------------------------------------*/

//cookie読み出し処理
if(document.cookie.length > 0){                       //cookieにデータがある場合実行
  var cookie_data = document.cookie.split(';');       //データ分割(データごとに分割)
  var day_cookie_data = document.cookie.split('=');   //データ分割(名前とデータを分割)
  day[0].value = day_cookie_data[1];                  //日付の1つ目にcookieを代入

  for(let i = 0; i < day.length; i++){                          //日付データの数だけ繰り返す
    var tomo = new Date(day[0].value);                          //１つ目の日付データをDate形に変換
    tomo.setDate( tomo.getDate() + i );                         //日をi日分加算

    day[i].value = `${tomo.getMonth() + 1}/${tomo.getDate()}`;  //加算したデータを保存
  }
}

/*-------------------------------------------------------------------*/

//各項目にonchange設定
day[0].onchange = day_calc;

for(let i = 0; i < mor_maxdata.length; i++){
  mor_maxdata[i].onchange = calc;
}
for(let i = 0; i < mor_mindata.length; i++){
  mor_mindata[i].onchange = calc;
}

/*-------------------------------------------------------------------*/

//日付入力時処理
  function day_calc(){    //onchangeで呼ばれ、処理を行う関数を呼び出す
    day_data(day);
  }

  function day_data(d_data){
    var today = new Date();                                          //本日の日付をDate型で取得(今の年を取得するため)
    d_data[0].value = `${today.getFullYear()}/${d_data[0].value}`    //今の年の情報を１つ目の日付データに追加
    document.cookie = `day_cookie=${d_data[0].value}`;               //cookieに日付を保存

    for(let i = 0; i < d_data.length; i++){                         //日付データの数だけ繰り返す
      var tomo = new Date(d_data[0].value);                         //１つ目の日付データをDate形に変換
      tomo.setDate( tomo.getDate() + i );                           //日をi日分加算

      d_data[i].value = `${tomo.getMonth() + 1}/${tomo.getDate()}`  //加算したデータを保存
    }
  }

/*-------------------------------------------------------------------*/

//平均値算出処理
  function calc(){                            //onchangeで呼ばれ、処理を行う関数を呼び出す
    calc_data(mor_maxdata , mor_bpmax_ave);   //血圧の最大値の処理
    calc_data(mor_mindata , mor_bpmin_ave);   //血圧の最小値の処理
  }

  function calc_data(data , ptn){
    let sum = 0;      //データの合計値
    let num = 0;      //データの数
    for(let i = 0; i < data.length; i++){                       //データの数だけ繰り返す
      if(!isNaN(data[i].value) && data[i].value.length > 0){    //入力が数字かつ空でないとき実行
        sum += parseInt(data[i].value);                         //記入されているデータの合計値を加算
        num++;                                                  //記入されているデータの数を1増やす
      }
    }
 
    if(num != 0){         //データの数が0ではない時(データがある時)実行
      sum = sum / num;    //平均値計算
    }
    ptn.innerHTML = sum;  //平均値を表示
  }

/*-------------------------------------------------------------------*/

//ボタン(本日の日付入力)
  btn.onclick = function(){
    var today = new Date();                                                       //本日の日付をDate形で取得
    day[0].value = String(today.getMonth() + 1) + "/" + String(today.getDate());  //本日の日付を日付の1つ目に代入(月/日)
    day_data(day);                                                                //残りの日付を表示するため関数呼び出し
  }
})();