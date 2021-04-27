<template>
  <div class="dropdown">
    <a class="position-option" title="Conéctate" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="fa-stack fa-2x" style="font-size: 25px; color: InfoText;">
        <i class="fas fa-circle fa-stack-2x"></i>
        <i class="far fa-comments fa-stack-1x fa-inverse"></i>
      </span>
    </a>
    <ul class="dropdown-menu styleRefactor">
      <li>
        <span class="fa-stack fa-2x" style="font-size: 25px; color: grey;">
          <i class="fas fa-circle fa-stack-2x"></i>
          <i class="far fa-envelope fa-stack-1x fa-inverse"></i>
        </span>
      </li>
      <li>
        <span class="fa-stack fa-2x" style="font-size: 25px; color: green;">
          <i class="fas fa-circle fa-stack-2x"></i>
          <i class="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
        </span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.position-option {
  z-index: 999999;
  position: fixed;
  justify-content: end;
  justify-items: end;
  margin-left: 94%;
  top: 90%;
  cursor: pointer;
}

.styleRefactor {
  min-width: 0.1rem;
  background-color: transparent;
  border: none;
}
</style>
