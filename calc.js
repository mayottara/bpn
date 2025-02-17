(function() {
  'use strict';
  const btn = document.getElementById('today');
  const testbtn = document.getElementById('testbtn');

  const mor_bpmax_ave = document.getElementById('mor_bpmax_ave')
  const mor_bpmin_ave = document.getElementById('mor_bpmin_ave')
  const mor_pul_ave = document.getElementById('mor_pul_ave')
  const nig_bpmax_ave = document.getElementById('nig_bpmax_ave')
  const nig_bpmin_ave = document.getElementById('nig_bpmin_ave')
  const nig_pul_ave = document.getElementById('nig_pul_ave')

  let mor_maxdata = document.getElementsByClassName('mor_max')
  let mor_mindata = document.getElementsByClassName('mor_min')
  let mor_puldata = document.getElementsByClassName('mor_pul')
  let nig_maxdata = document.getElementsByClassName('nig_max')
  let nig_mindata = document.getElementsByClassName('nig_min')
  let nig_puldata = document.getElementsByClassName('nig_pul')
  let day = document.getElementsByClassName('day')
/*-------------------------------------------------------------------*/

//cookie読み出し処理
  if(document.cookie.length > 0){                             //cookieにデータがある場合実行
    let cookie_D = document.cookie.split(';');                //データ分割(データごとに分割)
    
    for(let i = 0; i < cookie_D.length; i++){
      let cookie_DATA = cookie_D[i].split('=');                //データ分割(名前とデータを分割)
      
      //日付のcookie読み出し***************************************************
      if(cookie_DATA[0] === "day_cookie" || cookie_DATA[0] === " day_cookie"){
        day[0].value = cookie_DATA[1];                         //日付の1つ目にcookieを代入

        for(let j = 0; j < day.length; j++){                          //日付データの数だけ繰り返す
          let tomo = new Date(day[0].value);                          //１つ目の日付データをDate形に変換
          tomo.setDate( tomo.getDate() + j );                         //日をi日分加算

          day[j].value = `${tomo.getMonth() + 1}/${tomo.getDate()}`;  //加算したデータを保存
        }
      }
      
      //血圧等のcookieデータ読み出し********************************************
      else if(cookie_DATA[0] === "cookie_data" || cookie_DATA[0] === " cookie_data"){
        let deta_list = cookie_DATA[1].split(',');

        for(let j = 0; j < mor_maxdata.length; j++){
          mor_maxdata[j].value = deta_list[6 * j];
          mor_mindata[j].value = deta_list[6 * j + 1];
          mor_puldata[j].value = deta_list[6 * j + 2];
          nig_maxdata[j].value = deta_list[6 * j + 3];
          nig_mindata[j].value = deta_list[6 * j + 4];
          nig_puldata[j].value = deta_list[6 * j + 5];
        }
        calc();
      }
    }
  }

/*-------------------------------------------------------------------*/

//各項目にonchange設定
  day[0].onchange = day_calc;

  for(let i = 0; i < mor_maxdata.length; i++){
    mor_maxdata[i].onchange = calc;
    mor_mindata[i].onchange = calc;
    mor_puldata[i].onchange = calc;
    nig_maxdata[i].onchange = calc;
    nig_mindata[i].onchange = calc;
    nig_puldata[i].onchange = calc;
  }

/*-------------------------------------------------------------------*/

//日付入力時処理
  function day_calc(){    //onchangeで呼ばれ、処理を行う関数を呼び出す
    day_data(day);
  }

  function day_data(d_data){
    let today = new Date();                                          //本日の日付をDate型で取得(今の年を取得するため)
    document.cookie = `day_cookie=${today.getFullYear()}/${d_data[0].value};max-age=1728000`;               //cookieに日付を保存

    for(let i = 0; i < d_data.length; i++){                         //日付データの数だけ繰り返す
      let tomo = new Date(`${today.getFullYear()}/${d_data[0].value}`);                         //１つ目の日付データをDate形に変換
      tomo.setDate( tomo.getDate() + i );                           //日をi日分加算

      d_data[i].value = `${tomo.getMonth() + 1}/${tomo.getDate()}`  //加算したデータを保存
    }
  }

/*-------------------------------------------------------------------*/

//平均値算出処理
  function calc(){                            //onchangeで呼ばれ、処理を行う関数を呼び出す
    calc_data(mor_maxdata , mor_bpmax_ave);   //朝の血圧の最大値の処理
    calc_data(mor_mindata , mor_bpmin_ave);   //朝の血圧の最小値の処理
    calc_data(mor_puldata , mor_pul_ave);     //朝の脈拍の処理
    calc_data(nig_maxdata , nig_bpmax_ave);   //夜の血圧の最大値の処理
    calc_data(nig_mindata , nig_bpmin_ave);   //夜の血圧の最小値の処理
    calc_data(nig_puldata , nig_pul_ave);     //夜の脈拍の処理
    data_keep();
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
      sum = Math.round((sum / num) * 10) / 10;    //平均値計算
    }
    ptn.innerHTML = sum;  //平均値を表示
  }

/*-------------------------------------------------------------------*/

//ボタン(本日の日付入力)
  btn.onclick = function(){
    let today = new Date();                                                       //本日の日付をDate形で取得
    day[0].value = String(today.getMonth() + 1) + "/" + String(today.getDate());  //本日の日付を日付の1つ目に代入(月/日)
    day_data(day);                                                                //残りの日付を表示するため関数呼び出し
  }

/*-------------------------------------------------------------------*/

//表のデータをcookieに保存
  function data_keep(){
    let str = 'cookie_data=';
    for(let i = 0; i < mor_maxdata.length; i++){
      str += mor_maxdata[i].value+','+mor_mindata[i].value+','+mor_puldata[i].value+','+
             nig_maxdata[i].value+','+nig_mindata[i].value+','+nig_puldata[i].value+',';
    }
    document.cookie = `${str};max-age=1728000`;
  }

/*-------------------------------------------------------------------*/
})();