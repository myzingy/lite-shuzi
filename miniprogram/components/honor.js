/**
 * Created by goto9 on 2018/12/12.
 */
import {vk} from 'vktool'
const honor=[
  {icon:'sx',count:12,ext:'png',hasTop:true,hasBottom:true,title:'生肖宠兽',thumb:'sx.png',info:'十二生肖，又叫属相，是中国与十二地支相配以人出生年份的十二种动物，包括鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪'},
  {icon:'nsj',count:11,ext:'png',title:'南山宠兽',thumb:'nsj%20%281%29.png',info:'山海经--南山经'},
  {icon:'ncj',count:13,ext:'png',title:'南次宠兽',thumb:'ncj%20%281%29.png',info:'山海经--南次二经、南次三经'},
  {icon:'xsj',count:18,ext:'png',title:'西山宠兽',thumb:'xsj%20%281%29.png',info:'山海经--西山经'},
  {icon:'long',count:9,ext:'jpg',hasTop:true,title:'稀缺·龙子九兽',thumb:'long.jpg',
    info:'龙生九子是指龙生九个儿子，九个儿子都不成龙，各有不同；九子分别是：囚牛、睚眦、嘲风、蒲牢、狻猊、赑屃、狴犴、负屃、螭吻'}
]
export default {
  honor:honor,
  formatNum($num,hasGetIcon=false){
    let data={},icon='';
    honor.forEach(h=>{
      data[h.icon]=0;
    });
    let icon_index=0;
    for(let i=1;i<=$num;i++){
      //if(i%6==0){
      if(i%7==0){
        data['long']+=1;
        icon='long';
      }else{
        let ic=honor[icon_index];
        data[ic.icon]+=1;
        icon=ic.icon;
        if(data[ic.icon]+1>ic.count){
          icon_index+=1;
        }
      }
    }
    if(hasGetIcon){
      return {data:data,icon:icon}
    }
    return data;
  },
  getHonorIcon($num){
    return this.formatNum($num,true);
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
  /**
   * @param obj.total,obj.last_addtime
   */
  getNextImage(obj){
    let last=vk.date_format(obj.last_addtime,"YYYYMMDD");
    let now=vk.date_format(vk.time(),"YYYYMMDD");
    if(last!=now){
      obj.total+=1;
    }
    let hi=this.getHonorIcon(obj.total);
    let ho=this.getHonorItems(hi.icon);
    console.log(hi,hi.data[ho.icon],obj)
    return 'http://shuzi132-img.vking.wang/'+ho.icon+'%20%28'+(parseInt(hi.data[ho.icon]))+'%29.'+ho.ext
  }
}
