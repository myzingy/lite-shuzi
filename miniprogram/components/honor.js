/**
 * Created by goto9 on 2018/12/12.
 */
const honor=[
  {icon:'sx',count:12,ext:'png',hasTop:true,hasBottom:true,title:'生肖宠兽',thumb:'sx.png'},
  {icon:'nsj',count:11,ext:'png',title:'南山宠兽',thumb:'nsj%20%281%29.png'},
  {icon:'ncj',count:13,ext:'jpg',title:'南次宠兽',thumb:'ncj%20%281%29.jpg'},
  {icon:'xsj',count:18,ext:'png',title:'西山宠兽',thumb:'xsj%20%281%29.png'},
  {icon:'long',count:9,ext:'jpg',hasTop:true,title:'龙子九兽',thumb:'long.jpg',
    info:'龙生九子是指龙生九个儿子，九个儿子都不成龙，各有不同；九子分别是：囚牛、睚眦、嘲风、蒲牢、狻猊、赑屃、狴犴、负屃、螭吻'}
]
export default {
  honor:honor,
  formatNum($num){
    let data={}
    honor.forEach(h=>{
      data[h.icon]=0;
    });
    let icon_index=0;
    for(let i=1;i<=$num;i++){
      if(i%6==0){
        data['long']+=1;
      }else{
        let ic=honor[icon_index];
        data[ic.icon]+=1;
        if(data[ic.icon]+1>=ic.count){
          icon_index+=1;
        }
      }
    }
    return data;
  },
  getHonorItems($icon){
    let ho={};
    for(let i=0; i<honor.length;i++){
      if(honor[i].icon==$icon){
        ho=honor[i];
        ho.items=[];
        for(let j=1;j<=ho.count;j++){
          ho.items.push('http://shuzi132-img.vking.wang/'+ho.icon+'%20%28'+j+'%29.'+ho.ext);
        }
        break;
      }
    }
    return ho;
  },
}
