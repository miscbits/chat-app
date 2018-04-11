<template>
    <ul class="users">
        <li class="clearfix" v-for="user in users">
            <div class="users-sidebar clearfix">
                <div class="header">
                    <strong class="primary-font">
                        {{ user.name }}
                    </strong>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
  export default {
    props: ['users']
  };
</script>
