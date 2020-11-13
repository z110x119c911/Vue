<template>
    <div>
        <!-- <loading :active.sync="isLoading"></loading>s -->
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">購買時間</th>
                    <th width="250">E-mail</th>
                    <th>購買款項</th>
                    <th width="140">應付金額</th>
                    <th width="100">是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in OrderList" :key="item.id">
                    <td>
                        {{item.create_at | date}}
                    </td>
                    <td>
                        {{item.user.email}}
                    </td>
                    <td>
                        <ul class="list-unstyled">
                            <li v-for="(product, i) in item.products" :key="i">
                                {{ product.product.title }} 數量：{{ product.qty }}
                                {{ product.product.unit }}
                            </li>
                        </ul>
                    </td>
                    <td class="text-right">
                        {{item.total | currency}}
                    </td>
                    <td>
                        <span v-if="item.is_paid" class="text-success">已付款</span>
                        <span v-else>尚未啟用</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            OrderList:[],
        }
    },
    methods:{
        getOrderList(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders`;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.isLoading = false;
                vm.OrderList = response.data.orders;
                console.log(response.data);
            });
        },
    },
    created(){
        this.getOrderList();
    }
}
</script>