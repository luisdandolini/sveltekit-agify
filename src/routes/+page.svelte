<script lang="ts">
	import { goto, beforeNavigate } from '$app/navigation';

	export let data: { name: string; age: number | null };

	let inputName = data.name;
	let displayedName = data.name;
	let age = data.age;
	let isLoading = false;

	let debounceTimeout: ReturnType<typeof setTimeout>;

	function handleInput() {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			isLoading = true;
			goto(`/?name=${inputName}`);
		}, 1000);
	}

	beforeNavigate(() => {
		isLoading = true;
	});

	$: {
		displayedName = data.name;
		age = data.age;
		isLoading = false;
	}
</script>

<div class="background">
	<div class="container">
		<div class="header">
			<h1 class="title">Descobridor de Idades</h1>
			<p class="subtitle">Digite um nome e descubra a idade estimada</p>
		</div>

		<div class="input-wrapper">
			<input
				type="text"
				bind:value={inputName}
				placeholder="Digite um nome..."
				on:input={handleInput}
				class="name-input"
			/>
			<div class="input-glow"></div>
		</div>

		<div class="result-area">
			{#if isLoading}
				<div class="loading-container">
					<div class="spinner"></div>
					<p class="loading-text">Descobrindo a idade...</p>
				</div>
			{:else if age !== null}
				<div class="result-card">
					<p class="result-text">
						<span class="name-highlight">{displayedName}</span>
						<br />
						tem aproximadamente
						<br />
						<span class="age-highlight">{age} anos</span>
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

	.background {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
	}

	.container {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 24px;
		padding: 48px 40px;
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.1),
			0 0 80px rgba(102, 126, 234, 0.3);
		max-width: 500px;
		width: 80%;
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.header {
		margin-bottom: 40px;
	}

	.title {
		font-size: 2.5rem;
		font-weight: 700;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0 0 12px 0;
		animation: titleGlow 3s ease-in-out infinite alternate;
	}

	@keyframes titleGlow {
		0% {
			filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.3));
		}
		100% {
			filter: drop-shadow(0 0 20px rgba(118, 75, 162, 0.5));
		}
	}

	.subtitle {
		color: #666;
		font-size: 1.1rem;
		font-weight: 400;
		margin: 0;
		opacity: 0.8;
	}

	.input-wrapper {
		position: relative;
		margin-bottom: 40px;
	}

	.name-input {
		width: 85%;
		padding: 18px 24px;
		font-size: 1.1rem;
		font-weight: 500;
		border: 2px solid transparent;
		border-radius: 16px;
		outline: none;
		background: rgba(255, 255, 255, 0.8);
		color: #333;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		font-family: inherit;
	}

	.name-input:focus {
		background: rgba(255, 255, 255, 1);
		border-color: #667eea;
		transform: translateY(-2px);
		box-shadow:
			0 8px 30px rgba(0, 0, 0, 0.12),
			0 0 20px rgba(102, 126, 234, 0.3);
	}

	.name-input::placeholder {
		color: #999;
		font-weight: 400;
	}

	.input-glow {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 16px;
		background: linear-gradient(135deg, #667eea, #764ba2);
		opacity: 0;
		z-index: -1;
		transition: opacity 0.3s ease;
		filter: blur(20px);
	}

	.name-input:focus + .input-glow {
		opacity: 0.2;
	}

	.result-area {
		min-height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.spinner {
		width: 50px;
		height: 50px;
		border: 4px solid rgba(102, 126, 234, 0.2);
		border-top: 4px solid #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.loading-text {
		color: #667eea;
		font-weight: 500;
		font-size: 1.1rem;
		margin: 0;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.7;
		}
		50% {
			opacity: 1;
		}
	}

	.result-card {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 32px 28px;
		border-radius: 20px;
		box-shadow:
			0 15px 35px rgba(102, 126, 234, 0.3),
			0 5px 15px rgba(0, 0, 0, 0.1);
		animation: resultAppear 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.result-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	@keyframes resultAppear {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-8px);
		}
		60% {
			transform: translateY(-4px);
		}
	}

	.result-text {
		font-size: 1.2rem;
		line-height: 1.6;
		margin: 0;
		font-weight: 400;
	}

	.name-highlight {
		font-weight: 700;
		font-size: 1.3em;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.age-highlight {
		font-weight: 700;
		font-size: 2em;
		display: inline-block;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		margin-top: 8px;
	}

	@media (max-width: 600px) {
		.container {
			padding: 32px 24px;
			margin: 10px;
		}

		.title {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.name-input {
			padding: 16px 20px;
			font-size: 1rem;
		}

		.result-card {
			padding: 24px 20px;
		}

		.age-highlight {
			font-size: 1.8em;
		}
	}
</style>
