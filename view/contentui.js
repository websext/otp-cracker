export default
`<div class="primary-page">
<header>
	<div class="extlogo">
		<img src="/icons/favicon128.png" alt="OTP Cracker" draggable="false">
	</div>
</header>
<div class="wrapper">
	<div class="input-fields">
		<div class="field select-field">
			<div style="flex:1;">
				<select id="length">
					<option value="0" selected>Select OTP Length</option>
					<option value="1">01</option>
					<option value="2">02</option>
					<option value="3">03</option>
					<option value="4">04</option>
					<option value="5">05</option>
					<option value="6">06</option>
					<option value="7">07</option>
					<option value="8">08</option>
					<option value="9">09</option>
					<option value="10">10</option>
					<option value="11">11</option>
					<option value="12">12</option>
				</select>
				<div class="error"></div>
			</div>
			<div style="flex:1;">
				<select id="combination">
					<option value="0" selected>Select OTP Types</option>
					<option value="UpperAlphaNum">Upper alpha & Integer</option>
					<option value="UpperLowerAlpha">Upper/Lower Alpha</option>
					<option value="Num">Integer</option>
					<option value="LowerAlpha">Lower alpha</option>
					<option value="UpperAlpha">Upper alpha</option>
					<option value="LowerAlphaNum">Lower alpha & Integer</option>
					<option value="UpperLowerAlphaNum">Upper/Lower alpha & Integer</option>
				</select>
				<div class="error"></div>
			</div>
		</div>
		<div class="field">
			<input type="text" id="selector" placeholder="Enter target ID/CLASS">
			<div class="error"></div>
		</div>
		<div class="trigger">
			<button id="btnattacker">Continue</button>
		</div>
	</div>
</div>
<footer>
	<p>Develope By: Shahzada Moassir</p>
	<span><a href="https://github.com/shahzadamodassir">Follow Github</a> Copyright &copy; <span class="year">2023</span> All rights reserved. version: 1.0.0</span>
</footer>
</div>`;