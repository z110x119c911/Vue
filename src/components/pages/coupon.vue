<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
            <button class="btn btn-primary mt-4" @click="OpenAddModal()">建立新的優惠券</button>
        </div>
        
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th width="120">折扣百分比</th>
                    <th width="160">到期日</th>
                    <th width="160">是否啟用</th>
                    <th width="100">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in Coupons" :key="item.id">
                    <td>
                        {{ item.title }}
                    </td>
                    <td>
                        {{ item.percent }} {{ '%' }}
                    </td>
                    <td>
                        {{ item.due_date | date}}
                    </td>
                    <td>
                        <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="OpenEditModal(item)">編輯</button>
                        <button class="btn btn-outline-primary btn-sm" @click="OpendeleModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    <!-- 新增優惠券 -->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>新增優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">標題</label>
                            <input type="text" v-model="tempCoupon.title" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">優惠碼</label>
                            <input type="text" v-model="tempCoupon.code" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="due_date">到期日</label>
                            <input type="date" id="due_date" v-model="due_date" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">折扣百分比</label>
                            <input type="text" v-model="tempCoupon.percent" class="form-control">
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">是否啟用</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="AddCoupon()">新增優惠券</button>
                    </div>
                </div>
            </div>
        </div>
    <!-- 編輯優惠券 -->
        <div class="modal fade" id="EditModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>編輯優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">標題</label>
                            <input type="text" v-model="tempCoupon.title" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">優惠碼</label>
                            <input type="text" v-model="tempCoupon.code" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">到期日</label>
                            <input type="date" v-model="due_date" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">折扣百分比</label>
                            <input type="text" v-model="tempCoupon.percent" class="form-control">
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0" id="customCheck2">
                            <label class="custom-control-label" for="customCheck2">是否啟用</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="EditCoupon()">更新優惠券</button>
                    </div>
                </div>
            </div>
        </div>
    <!-- 刪除優惠券 -->
        <div class="modal fade" id="deleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="deleCoupon">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{
            Coupons:[],
            tempCoupon:{},
            isLoading: false,
            due_date: '',
        };
    },
    watch: {
        due_date() {
            const vm = this;
            let timestamp = Math.floor(new Date(vm.due_date) / 1000);
            vm.tempCoupon.due_date = timestamp;
        },
    },
    methods:{
        getCoupon(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
            vm.isLoading = true;
            this.$http.get(api,vm.tempCoupon).then((response) => {
                console.log(response.data);
                vm.isLoading = false;
                vm.Coupons = response.data.coupons;
            })
        },
        OpenAddModal(){
            const vm = this;
            vm.tempCoupon = {};
            vm.due_date = '';
            
            $("#addModal").modal("show");
        },
        AddCoupon(){
            const vm = this;
            vm.isLoading = true;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
            this.$http.post(api,{data:vm.tempCoupon}).then((response) => {
                console.log(response.data);
                vm.isLoading = false;
                this.getCoupon();
                $('#addModal').modal('hide');
            })
        },
        OpenEditModal(item){
            const vm = this;
            //new object
            vm.tempCoupon = Object.assign({}, item);
            //轉換timestamp成時間
            let NewDate = vm.tempCoupon.due_date;
            let date = new Date(NewDate * 1000).toISOString().split('T');
            vm.due_date = date[0];

            $("#EditModal").modal("show");
        },
        EditCoupon(){
            const vm = this;
            const id = vm.tempCoupon.id;
            vm.isLoading = true;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`;
            this.$http.put(api,{data:vm.tempCoupon}).then((response) => {   
                if(response.data.success){
                    console.log(response.data);
                    vm.isLoading = false;
                    this.getCoupon();
                    $('#EditModal').modal('hide');
                }else{
                    console.log(response.data);
                    vm.isLoading = false;
                    this.getCoupon();
                    $('#EditModal').modal('hide');
                }
            })
        },
        OpendeleModal(item){
            const vm = this;
            vm.tempCoupon = Object.assign({}, item);
            $('#deleModal').modal('show');
        },
        deleCoupon(){
            const vm = this;      
            const id = vm.tempCoupon.id;
            vm.isLoading = true;   
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`;
            this.$http.delete(api).then((response) => {
                if(response.data.success){
                    console.log(response);
                    vm.isLoading = false;
                    vm.getCoupon();
                    $('#deleModal').modal('hide');
                }else{
                    vm.isLoading = false;
                    vm.getCoupon();
                    alert("刪除失敗");
                    $("#deleModal").modal("hide");
                }
            })
        },
    },
    created(){
        this.getCoupon();
    }
}
</script>