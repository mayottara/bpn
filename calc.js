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

  day[0].onchange = day_calc;

  for(let i = 0; i < mor_maxdata.length; i++){
    mor_maxdata[i].onchange = calc;
  }
  for(let i = 0; i < mor_mindata.length; i++){
    mor_mindata[i].onchange = calc;
  }

/*-------------------------------------------------------------------*/
//日付入力時処理
  function day_calc(){
    day_data(day);
  }

  function day_data(d_data){
    var today = new Date();
    d_data[0].value = `${today.getFullYear()}/${d_data[0].value}`   //年の情報追加

    for(let i = 0; i < d_data.length; i++){
      var tomo = new Date(d_data[0].value);
      tomo.setDate( tomo.getDate() + i );     //日を加算

      d_data[i].value = `${tomo.getMonth() + 1}/${tomo.getDate()}`
    }
  }
/*-------------------------------------------------------------------*/
//平均値算出処理
  function calc(){
    calc_data(mor_maxdata , mor_bpmax_ave);
    calc_data(mor_mindata , mor_bpmin_ave);
  }

  function calc_data(data , ptn){
    let sum = 0;
    let num = 0;
    for(let i = 0; i < data.length; i++){
      if(!isNaN(data[i].value) && data[i].value.length > 0){    //入力が数字かつ空でないとき
        sum += parseInt(data[i].value);
        num++;
      }
    }
 
    if(num != 0){
      sum = sum / num;
    }
    ptn.innerHTML = sum
  }
/*-------------------------------------------------------------------*/
//ボタン(本日の日付入力)
  btn.onclick = function(){
    var today = new Date();
    day[0].value = String(today.getMonth() + 1) + "/" + String(today.getDate());;
    day_data(day);
  }
})();