<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="row mt-4">
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
                        <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">分類</span>
                        <h5 class="card-title">
                            <a href="#" class="text-dark">{{ item.title }}</a>
                        </h5>
                        <p class="card-text">{{ item.content }}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <!-- <div class="h5">2,800 元</div> -->
                            <del class="h6" v-if="item.price">原價 {{ item.origin_price | currency }} 元</del>
                            <div class="h5" v-if="item.price">現在只要 {{ item.price | currency }} 元</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem != ''"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem2 != ''"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>
        </div>


<!-- list section -->
        <table class="table">
        <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
        </thead>
        <tbody>
            <tr  v-for="(item) in cart.carts" :key="item.id">
                <td class="align-middle">
                    <button type="button" class="btn btn-outline-danger btn-sm">
                    <i class="far fa-trash-alt" @click="deleteCart(item.id)"></i>
                    </button>
                </td>
                <td class="align-middle">
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                    </div>
                </td>
                <td class="align-middle">
                    {{ item.qty }}
                </td>
                <td class="align-middle text-right">
                    {{ item.final_total | currency }} {{'元'}}
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">
                    {{ cart.total | currency }}
                </td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">
                    {{ cart.final_total | currency }}
                </td>
            </tr>
        </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="addCoupon_code()">
                套用優惠碼
                </button>
            </div>
        </div>


        <div class="modal fade" id="ProductDetail" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header text-white">
                        <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                
                    <div class="modal-body">
                        <img :src="product.imageUrl" class="img-fluid" alt="">
                        <blockquote class="blockquote mt-3">
                            <p class="mb-0">{{ product.content }}</p>
                            <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                        </blockquote>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                            <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                            <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                        </div>
                        <select name="" class="form-control mt-3" v-model="product.num">
                        <option :value="num" v-for="num in 10" :key="num">
                            選購 {{num}} {{product.unit}}
                        </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <div class="modal-footer">
                            <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ product.num * product.price }}</strong> 元
                            </div>
                            <button type="button" class="btn btn-primary"
                                @click="addtoCart(product.id, product.num)">
                                <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                                加到購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="my-5 row justify-content-center">
            <ValidationObserver class="col-md-6" v-slot="{ invalid}">
                <form @submit.prevent="createOrder">
                    <ValidationProvider rules="required|email" v-slot="{ errors , classes }">
                        <div class="form-group" >
                            <!-- 輸入框 -->
                            <label for="email">Email</label>
                            <input id="email" type="email" name="email" v-model="form.user.email"
                                class="form-control" :class="classes">
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ errors , classes }">
                        <div class="form-group">
                            <label for="username">收件人姓名</label>
                            <input type="text" class="form-control" :class="classes" name="姓名" id="username"
                            v-model="form.user.name" placeholder="輸入姓名">
                            <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ errors , classes }">
                        <div class="form-group">
                            <label for="usertel">收件人電話</label>
                            <input type="tel" name="電話號碼" :class="classes" class="form-control" id="usertel" 
                            v-model="form.user.tel" placeholder="請輸入電話">
                            <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ errors , classes }">
                        <div class="form-group">
                            <label for="useraddress">收件人地址</label>
                            <input type="text" :class="classes" class="form-control" name="address" id="useraddress"
                                placeholder="請輸入地址" v-model="form.user.address">
                            <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10"></textarea>
                        </div>
                    <div class="text-right">
                        <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
        
    </div>    
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{
            products:[],
            isLoading: false,
            product:{},
            status:{
                loadingItem:'',
                loadingItem2:'',
            },
            cart:{},
            coupon_code:'',
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:'',
            }
        };
    },
    methods:{
        getProducts(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.isLoading = false;
                vm.products = response.data.products;
                console.log(response.data);
            });
        },
        getProduct(id){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            vm.isLoading = true;
            vm.status.loadingItem = id;
            this.$http.get(api).then((response) => {
                vm.isLoading = false;
                $('#ProductDetail').modal('show');
                vm.product = response.data.product;
                vm.status.loadingItem = '';
                console.log(response.data);
            });
        },
        addtoCart(id,qty = 1){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.status.loadingItem2 = id;
            const cart = {
                product_id: id,
                qty
            }
            this.$http.post(api,{data:cart}).then((response) => {
                vm.status.loadingItem2 = '';
                vm.getCart();
                $('#ProductDetail').modal('hide');
                console.log(response.data);
            });
        },
        getCart(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.isLoading = false;
                vm.cart = response.data.data;
                console.log(response.data);
            });
        },
        deleteCart(id){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            vm.isLoading = true;
            this.$http.delete(api).then((response) => {
                vm.getCart();
                vm.isLoading = false;
                console.log(response);
            });
        },
        addCoupon_code(){
            const vm = this;
            const coupon = {
                code: vm.coupon_code
            }
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            vm.isLoading = true;
            this.$http.post(api,{data:coupon}).then((response) => {
                vm.getCart();
                vm.isLoading = false;
                console.log(response);
            });
        },
        createOrder(){
            const vm = this;
            const order = vm.form;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            // vm.isLoading = true;
            this.$http.post(api,{data:order}).then((response) => {
                console.log('訂單建立',response);
                if(response.data.success){
                    vm.$router.push(`/admin/checkout/${response.data.orderId}`);
                } 
                vm.isLoading = false;
            });
        }
    },
    created(){
        this.getProducts();
        this.getCart();
    }
}
</script>