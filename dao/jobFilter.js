
//logic for filtering using the checkboxes with multiple select that is tech and company.
let filterController = {
    applyFilter: async function(companyList, techArray) {
        let resultArray=[];
        for(let i=0;i<companyList.length;i++)
        {
            for (let j=0; j< companyList[i].projects.length;j++)
            {
                for(let k=0;k<companyList[i].projects[j].technologies.length;k++)
                {
                    for(let m=0;m<techArray.length;m++)
                    {
                        if(techArray[m]==companyList[i].projects[j].technologies[k])
                            resultArray.push(companyList[i]);
                    } 
                }
            }
        }
        resultArray = resultArray.filter((x, i, a) => a.indexOf(x) == i)
        console.log(resultArray);
        return resultArray;
    }
};

module.exports = filterController;