<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveList" @mouseenter="enterList">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3
                @mouseenter="changeIndex(index)"
                :class="{ cur: currentIndex == index }"
              >
                <a
                  :data-categoryName="c1.categoryName"
                  :data-categoryc1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-categoryc2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-categoryc3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    goSearch(event) {
      let ruselt = event.target.dataset;
      if (ruselt.categoryname) {
        let location = { name: "search" };
        let query = { categoryName: ruselt.categoryname };
        if(this.$route.params){
          location.params = this.$route.params
        }
        if (ruselt.categoryc1id) {
          query.category1Id = ruselt.categoryc1id;
        } else if (ruselt.categoryc2id) {
          query.category2Id = ruselt.categoryc2id;
        } else {
          query.category3Id = ruselt.categoryc3id;
        }
        location.query = query;
        this.$router.push(location);
      }
    },
    leaveList(){
      this.currentIndex = -1
      if(this.$route.path!=='/home'){
        this.show=false
      }
    },
    enterList(){
      if(this.$route.path!=='/home'){
        this.show=true
      }
    }

  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .cur {
            background-color: skyblue;
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }

    .sort-enter{
      height: 0px;
    }
    .sort-enter-to{
      height: 461px;
    }
    .sort-enter-active{
      transition: all 0.3s linear;
    }
  }
}
</style>