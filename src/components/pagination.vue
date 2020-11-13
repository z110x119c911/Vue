<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="ChangePage(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="item in pagination.total_pages" :key="item"
                :class="{'active': pagination.current_page === item}">
                    <a class="page-link" href="#" @click.prevent="ChangePage(item)">{{ item }}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="ChangePage(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </div>
</template>


<script>
export default {
    data(){
        return{

        };
    },
    props:['pagination'],
    methods:{
        ChangePage:function(item){
            this.$emit('ChangePage',item)
            console.log('這是測試',item);
        }
    },
    mounted(){
    
    },
}
</script>