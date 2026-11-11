---
layout: page
title: Berkenalan dengan Tim
description: Pengembangan Vite dipandu oleh tim internasional.
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from '@voidzero-dev/vitepress-theme'
import { core, advisors, emeriti } from './_data/team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Berkenalan dengan Tim</template>
    <template #lead>
      Pengembangan Vite dipandu oleh tim internasional, beberapa di antaranya
      memilih untuk ditampilkan di bawah ini.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="core" />
  <VPTeamPageSection>
    <template #title>Penasihat</template>
    <template #lead>
      Para penasihat turut mengarahkan pengembangan Vite dari sisi ekosistem dengan berbagi
      pengalaman mereka untuk membentuk Environment API dan merancang API di masa mendatang.
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="advisors" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>Tim Emeriti</template>
    <template #lead>
      Di sini, kami memberikan penghormatan kepada beberapa mantan anggota tim yang sudah tidak aktif, tetapi telah memberikan kontribusi berharga
      Di masa lalu.
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="emeriti" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
