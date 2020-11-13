<template>
    <div>
        確認訂單
    </div>
</template> 


<script>
export default {
    data(){
        return{
            orderId:''
        }
    },
    created(){
        this.orderId = this.$route.params.orderId;
        console.log(orderId);
    }
}
</script>