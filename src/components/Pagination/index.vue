<template>
  <div class="pagination">
      
    <button :disabled="this.pageNo ==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndNum.start-1" @click="$emit('getPageNo',1)">1</button>
    <button v-if="startNumAndNum.start>2">···</button>

    <button v-for="(page,index) in startNumAndNum.end" :key="index" v-if="page>=startNumAndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
    
    <button v-if="startNumAndNum.end<=totalPage-2">···</button>
    <button v-if="startNumAndNum.end<=totalPage-1" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
    <button @click="$emit('getPageNo',pageNo+1)" :disabled="this.pageNo == startNumAndNum.end">下一页</button>
    
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues','totalPage','getPageNo'],
    computed:{
      startNumAndNum(){
        let start=0
        let end = 0
        if(this.continues>this.total){
          start = 0
          end = this.total
        }else{
          start = this.pageNo - parseInt(this.continues/2)
          end = this.pageNo + parseInt(this.continues/2)
          if(start<1){
            start = 1 
            end = this.continues
          }
          if(end>this.totalPage){
            end=this.totalPage
            start=this.totalPage-this.continues+1
          }
        }
        return{start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
      .active{
    background-color: skyblue;
  }
  }
</style>
