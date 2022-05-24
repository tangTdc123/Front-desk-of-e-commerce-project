<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in shopCartInfo.cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              @change="changecheck(cartInfo)"
              :checked="cartInfo.isChecked == 1"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">{{ cartInfo.operateTime }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeShopNum(cartInfo, 'reduce', '-1')"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              value="1"
              minnum="1"
              class="itxt"
              @change="
                changeShopNum(cartInfo, 'input', $event.target.value * 1)
              "
              :value="cartInfo.skuNum"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeShopNum(cartInfo, 'add', '1')"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="removeShop(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckAll"
          @change="changeAllcheck()"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckedShop">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("getShopCart")
  },
  computed: {
    totalPrice() {
      let ruselt = 0;
      this.cartInfoList.forEach((element) => {
        if (element.isChecked == 1) {
          ruselt += element.cartPrice * element.skuNum;
        }
      });
      return ruselt;
    },
    shopCartInfo() {
      return this.$store.getters.shopCartInfo;
    },
    cartInfoList() {
      return this.shopCartInfo.cartInfoList || [];
    },
    isCheckAll() {
      return this.cartInfoList.every((element) => {
        return element.isChecked == 1;
      });
    },
  },
  methods: {
    deleteCheckedShop() {
      this.$store.dispatch("deleteCheckedShop").then(
        () => {
           this.$store.dispatch("getShopCart");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    changecheck: throttle(function (cartInfo) {
      if (cartInfo.isChecked == 1) {
        this.$store
          .dispatch("updateShopIsChecked", {
            skuID: cartInfo.skuId,
            isChecked: "0",
          })
          .then(
            (value) => {
              this.$store.dispatch("getShopCart");
            },
            (reason) => {
              alert(reason.message);
            }
          );
      } else {
        this.$store
          .dispatch("updateShopIsChecked", {
            skuID: cartInfo.skuId,
            isChecked: 1,
          })
          .then(
            (value) => {
              this.$store.dispatch("getShopCart");
            },
            (reason) => {
              alert(reason.message);
            }
          );
      }
    }, 500),
    removeShop(id) {
      this.$store.dispatch("removeShop", id).then(
        (value) => {
          this.$store.dispatch("getShopCart");
        },
        (reason) => {
          alert(reason.message);
        }
      );
    },
    changeShopNum: throttle(function (cartInfo, type, disNum) {
      let ruselt = 0;
      if (type == "input") {
        if (isNaN(disNum) || disNum < 1) {
          ruselt = 0;
        } else {
          ruselt = parseInt(disNum) - cartInfo.skuNum;
        }
      } else {
        if (cartInfo.skuNum <= 1 && type == "reduce") {
          ruselt = 0;
        } else {
          ruselt = disNum;
        }
      }
      this.$store
        .dispatch("addShopCart", { skuId: cartInfo.skuId, skuNum: ruselt })
        .then(
          (value) => {
            this.$store.dispatch("getShopCart");
          },
          (reason) => {
            alert(reason.message);
          }
        );
    }, 1000),
    changeAllcheck: throttle(function () {
      if (this.isCheckAll == true) {
        let rulest = this.cartInfoList.forEach((element) => {
          this.$store
            .dispatch("updateShopIsChecked", {
              skuID: element.skuId,
              isChecked: 0,
            })
            .then(
              (value) => {
                this.$store.dispatch("getShopCart");
              },
              (reason) => {
                alert(reason.message);
              }
            );
        });
      } else {
        this.cartInfoList.forEach((element) => {
          this.$store
            .dispatch("updateShopIsChecked", {
              skuID: element.skuId,
              isChecked: 1,
            })
            .then(
              (value) => {
                this.$store.dispatch("getShopCart");
              },
              (reason) => {
                alert(reason.message);
              }
            );
        });
      }
    }, 500),
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>