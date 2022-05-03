<template>
	<div class="container">
		<h1>Baby Name Generator</h1>
		<p>Choose your options and click the "Find Names" button below</p>
		<div class="options-list">
			<div class="options-item">
				<h4>1) Choose a gender</h4>
				<div class="options-item-buttons">
					<button
						class="options-item-buttons__item"
						:class="{ 'active': gender === options.gender }"
						v-for="gender in nameGenders"
						:key="gender"
						@click="options.gender = gender"
					>{{ gender }}</button>
				</div>
			</div>
			<div class="options-item">
				<h4>2) Choose the name's popularity</h4>
				<div class="options-item-buttons">
					<button
						class="options-item-buttons__item"
						:class="{ 'active': trend === options.popularity }"
						v-for="trend in nameTrends"
						:key="trend"
						@click="options.popularity = trend"
					>{{ trend }}
					</button>
				</div>
			</div>
			<div class="options-item">
				<h4>3) Choose name's length</h4>
				<div class="options-item-buttons">
					<button
						class="options-item-buttons__item"
						:class="{ 'active': length === options.length }"
						v-for="length in nameLengths"
						:key="length"
						@click="options.length = length"
					>{{ length }}
					</button>
				</div>
			</div>
		</div>
		<div class="results">
			<div class="results-list">
				<div
					class="results-item"
					v-for="name in filteredChildNamesList"
					:key="name"
				>{{ name }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import {nameGender, nameLength, nameTrend, childNamesList} from '~/data/names'
//
const nameGenders: nameGender[] = ['Boy', 'Unisex', 'Girl']
const nameTrends: nameTrend[] = ['Trendy', 'Any', 'Unique']
const nameLengths: nameLength[] = ['Short', 'Medium', 'Long']


interface IOptions {
	gender: nameGender,
	popularity: nameTrend,
	length: nameLength
}

const options: IOptions = reactive<IOptions>({
	gender: 'Boy',
	popularity: 'Any',
	length: 'Long'
})

const filteredChildNamesList = computed(() => {
  return childNamesList.filter(nameObj => {
		return nameObj.gender === options.gender &&
			(options.popularity === 'Any' ? true : (nameObj.popularity === options.popularity)) &&
			nameObj.length === options.length
	}).map(nameObj => nameObj.name)
})
</script>
<style scoped lang="scss">
.container {
	font-family: Arial, sans-serif;
	color: var(--c-text);
	max-width: 50rem;
	margin: 0 auto;
	text-align: center;
	h1 {
		font-size: 3rem;
	}
}
.options {
	&-list {
		background: var(--c-bg);
		border-radius: 2rem;
		padding: 1rem;
		width: 95%;
		margin: 4rem auto 0;
		position: relative;
	}
	&-item {
		margin-bottom: 2rem;
		&-buttons {
			&__item {
				background-color: #fff;
				outline: .15rem solid var(--c-accent);
				border: none;
				padding: .75rem;
				width: 12rem;
				font-size: 1rem;
				color: var(--c-text);
				cursor: pointer;
				font-weight: 200;
				&:first-child {
					border-top-left-radius: 1rem;
					border-bottom-left-radius: 1rem;
				}
				&:last-child {
					border-top-right-radius: 1rem;
					border-bottom-right-radius: 1rem;
				}
				&.active {
					background-color: var(--c-accent);
					color: #fff;
				}
			}
		}
	}
	.results {
		margin: 0 auto;
		&-list {
		  display: flex;
			justify-content: center;
			gap: 5px;
		}
		&-item {
		  
		}
	}
}
</style>
