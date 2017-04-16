using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestWebEWT
{
    [TestFixture]
    public class TestCase
    {
        private string baseUrl = "http://localhost:54841/";

        public ChromeDriver getDriver() {
            var driver  = new ChromeDriver();
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl(baseUrl);
            return driver;
        }

        [Test]
        public void testLinkMenu()
        {
            var driver = getDriver();
            driver.FindElement(By.Id("goToGallery")).Click();
            Assert.AreEqual(driver.Url, baseUrl + "Image/Gallery");
            driver.FindElement(By.Id("goToHome")).Click();
            Assert.AreEqual(driver.Url, baseUrl + "Home/Index");
            driver.FindElement(By.Id("goToUpload")).Click();
            Assert.AreEqual(driver.Url, baseUrl + "Image/UploadImage");
        }

        [Test]
        public void testDeletemage()
        {
            var driver = getDriver();
            driver.FindElement(By.Id("goToGallery")).Click();
            for (int i = 0; i < 2; i++)
            {
                var images = driver.FindElements(By.ClassName("cell"));
                Random random = new Random(DateTime.Now.Millisecond);
                var countImages = images.Count;
                images.ElementAt(random.Next(0, countImages - 1)).Click();
                driver.FindElement(By.Id("bt-delete")).Click();
                if (i % 2 == 0)
                {
                    driver.FindElement(By.Id("bt-yes")).Click();
                    driver.FindElement(By.Id("goToGallery")).Click();
                    Assert.AreEqual(driver.FindElements(By.ClassName("cell")).Count, countImages - 1);
                } else
                {
                    driver.FindElement(By.Id("bt-no")).Click();
                    driver.FindElement(By.Id("goToGallery")).Click();
                    Assert.AreEqual(driver.FindElements(By.ClassName("cell")).Count, countImages);
                }
            }
        }

        [Test]
        public void testGallery()
        {
            var driver = getDriver();
            driver.FindElement(By.Id("goToGallery")).Click();
            var images = driver.FindElements(By.ClassName("cell"));
           
            var checkboxes = driver.FindElements(By.CssSelector("input[type = 'checkbox']"));
            foreach (var chb in checkboxes)
            {
                if (chb.Selected)
                {
                    chb.Click();
                }
            }

            int count = 0;
            foreach (var img in images)
            {
                count += img.Displayed ? 1 : 0;
            }

            Assert.AreEqual(count, 0);

            var checkbox1 = checkboxes.ElementAt(0);
            checkbox1.Click();
            count = 0;
            int countCheckImage = 0;
            var expansionImage = checkbox1.GetAttribute("value");
            foreach (var img in images)
            {
                count += img.Displayed ? 1 : 0;
                var expansion = img.GetAttribute("src").Substring(img.GetAttribute("src").LastIndexOf(".") + 1);
                expansion = expansion == "jpg" || expansion == "png" ? expansion : "other";
                countCheckImage += expansion == expansionImage ? 1 : 0;
            }
            Assert.AreEqual(count, countCheckImage);
        }

        [Test]
        public void testUploadImage()
        {
            var driver = getDriver();
            driver.FindElement(By.Id("goToUpload")).Click();
           // String script = "document.getElementById('file').value='" + "C:/Users/Lenovo/Pictures/test.jpg" + "';";
           //     ((IJavaScriptExecutor)driver).ExecuteScript(script);
        }
    }
}