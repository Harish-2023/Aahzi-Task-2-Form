export const AahziForm = () => {

  return (
    <>
      <form id="multiStepForm">
        <div className="form-step active-step" id="step1">
            <label>Input 1:
            <input type="text" id="input1" name="input1" required />
            </label>

            <label >Input 2:
            <input type="text" id="input2" name="input2" required />
            </label>

            <label >Input 3:
            <input type="text" id="input3" name="input3" required />
            </label>

            <label >Input 4:
            <input type="text" id="input4" name="input4" required />
            </label>

            <label >Input 5:
            <input type="text" id="input5" name="input5" required />
            </label>

            <button type="button">Next</button>
        </div>

    <div className="form-step" id="step2">
      <label>Input 6:
      <input type="text" id="input6" name="input6" required />
      </label>

      <button type="button">Next</button>
      <button type="button" >Previous</button>
    </div>

    <div className="form-step" id="step3">
      <button type="button">Next</button>
      <button type="button" >Previous</button>
    </div>

    <div className="form-step" id="step4">
      <button type="button">Next</button>
      <button type="button" >Previous</button>
    </div>

    <div className="form-step" id="step5">
      <button type="button" >Previous</button>
      <button type="submit">Submit</button>
    </div>
  </form>
  </>
  )
}
